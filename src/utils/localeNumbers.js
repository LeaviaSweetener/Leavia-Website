const WESTERN_DIGITS = '0123456789'
const ARABIC_INDIC_DIGITS = '٠١٢٣٤٥٦٧٨٩'

const toArabicIndic = (digit) => ARABIC_INDIC_DIGITS[Number(digit)]
const toWestern = (digit) => String(ARABIC_INDIC_DIGITS.indexOf(digit))

export function localizeNumerals(value, lang) {
  if (value === null || value === undefined) return value

  const text = String(value)

  if (lang === 'ar') {
    const protectedTerms = []
    const textWithProtectedTerms = text.replace(/FSSC\s*22000/gi, (term) => {
      const marker = String.fromCodePoint(0xE000 + protectedTerms.length)
      protectedTerms.push([marker, term])
      return marker
    })

    let localized = textWithProtectedTerms
      .replace(/[0-9]/g, toArabicIndic)
      .replace(/([٠-٩])\.([٠-٩])/g, '$1٫$2')
      .replace(/%/g, '٪')

    protectedTerms.forEach(([marker, term]) => {
      localized = localized.replace(marker, term)
    })

    return localized
  }

  return text
    .replace(/[٠-٩]/g, toWestern)
    .replace(/٫/g, '.')
    .replace(/٪/g, '%')
}

const SKIPPED_ELEMENTS = new Set(['SCRIPT', 'STYLE', 'NOSCRIPT', 'TEXTAREA', 'CODE', 'PRE'])
const LOCALIZED_ATTRIBUTES = ['aria-label', 'title', 'placeholder']

function shouldSkip(node) {
  const parent = node.nodeType === Node.ELEMENT_NODE ? node : node.parentElement
  return parent?.closest?.('script, style, noscript, textarea, code, pre, [data-no-localize]') || SKIPPED_ELEMENTS.has(parent?.tagName)
}

function localizeNode(node, lang) {
  if (shouldSkip(node)) return

  if (node.nodeType === Node.TEXT_NODE) {
    const localized = localizeNumerals(node.nodeValue, lang)
    if (localized !== node.nodeValue) node.nodeValue = localized
    return
  }

  if (node.nodeType !== Node.ELEMENT_NODE) return

  LOCALIZED_ATTRIBUTES.forEach((attribute) => {
    if (!node.hasAttribute(attribute)) return
    const current = node.getAttribute(attribute)
    const localized = localizeNumerals(current, lang)
    if (localized !== current) node.setAttribute(attribute, localized)
  })

  const walker = document.createTreeWalker(node, NodeFilter.SHOW_TEXT)
  let textNode = walker.nextNode()
  while (textNode) {
    localizeNode(textNode, lang)
    textNode = walker.nextNode()
  }
}

export function observeLocalizedNumerals(root, lang) {
  if (!root) return () => {}

  localizeNode(root, lang)

  const observer = new MutationObserver((mutations) => {
    mutations.forEach((mutation) => {
      if (mutation.type === 'characterData') {
        localizeNode(mutation.target, lang)
        return
      }

      if (mutation.type === 'attributes') {
        localizeNode(mutation.target, lang)
        return
      }

      mutation.addedNodes.forEach((node) => localizeNode(node, lang))
    })
  })

  observer.observe(root, {
    subtree: true,
    childList: true,
    characterData: true,
    attributes: true,
    attributeFilter: LOCALIZED_ATTRIBUTES,
  })

  return () => observer.disconnect()
}

export { WESTERN_DIGITS, ARABIC_INDIC_DIGITS }
