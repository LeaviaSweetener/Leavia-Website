import { useState } from "react";
import ScrollReveal from "../shared/ScrollReveal/ScrollReveal";
import SectionTitle from "../shared/SectionTitle/SectionTitle";
import { useScrollAnimation } from "../../hooks/useScrollAnimation";
import { useLanguage } from "../../context/LanguageContext";
import { Check, X } from "lucide-react";
import "./WhyBetter.css";

const POSITIVE_MARK = String.fromCodePoint(0x2705);
const NEGATIVE_MARK = String.fromCodePoint(0x274c);

function TableStatus({ positive, isAr }) {
  const Icon = positive ? Check : X;
  const label = positive
    ? (isAr ? "نعم" : "Yes")
    : (isAr ? "لا" : "No");

  return (
    <span
      className={`why-better__status-icon why-better__status-icon--${positive ? "positive" : "negative"}`}
      role="img"
      aria-label={label}
    >
      <Icon size={24} strokeWidth={2} aria-hidden="true" />
    </span>
  );
}

function ComparisonValue({ value, isAr }) {
  if (value === POSITIVE_MARK) return <TableStatus positive isAr={isAr} />;
  if (value === NEGATIVE_MARK) return <TableStatus positive={false} isAr={isAr} />;
  return value;
}

function AnimatedBar({ value, max, color, delay }) {
  const [ref, isVisible] = useScrollAnimation({ threshold: 0.2 });

  return (
    <div ref={ref} className="why-better__bar-track">
      <div
        className="why-better__bar-fill"
        style={{
          width: isVisible ? `${(value / max) * 100}%` : "0%",
          background: color,
          transitionDelay: `${delay}s`,
        }}
      />
    </div>
  );
}

export default function WhyBetter() {
  const [activeTab, setActiveTab] = useState("comparison");
  const { t, isAr } = useLanguage();

  const COMPARISONS = [
    {
      labelKey: "wb_calories",
      leavia: 0,
      sugar: 387,
      max: 400,
      unit: "kcal",
      lowerIsBetter: true,
    },
    {
      labelKey: "wb_gut",
      leavia: 100,
      sugar: 0,
      max: 100,
      unit: "%",
      lowerIsBetter: false,
    },
    {
      labelKey: "wb_natural_ing",
      leavia: 100,
      sugar: 0,
      max: 100,
      unit: "%",
      lowerIsBetter: false,
    },
    {
      labelKey: "wb_antioxidant",
      leavia: 95,
      sugar: 0,
      max: 100,
      unit: "%",
      lowerIsBetter: false,
    },
    {
      labelKey: "wb_dental",
      leavia: 100,
      sugar: 0,
      max: 100,
      unit: "%",
      lowerIsBetter: false,
    },
  ];

  const SUGAR_ALTERNATIVES = [
    {
      name: "Regular Sugar",
      calories: 387,
      natural: false,
      noteKey: "wb_sugar_note",
    },
    {
      name: "Aspartame",
      calories: 4,
      natural: false,
      noteKey: "wb_aspartame_note",
    },
    {
      name: "Stevia (alone)",
      calories: 0,
      natural: true,
      noteKey: "wb_stevia_note",
    },
    {
      name: "Honey",
      calories: 304,
      natural: true,
      noteKey: "wb_honey_note",
    },
    {
      name: "Leavia Blend",
      calories: 0,
      natural: true,
      noteKey: "wb_leavia_note",
      highlight: true,
    },
  ];

  const arabicTableContent = [
    {
      name: "السكر الأبيض",
      note: "سعرات حرارية عالية.",
    },
    {
      name: "الأسبارتام",
      note: "مُحلّي صناعي منخفض السعرات الحرارية.",
    },
    {
      name: "الستيفيا منفردة",
      note: "طبيعية وتحتوي على صفر سعرة حرارية، وقد تترك مذاقًا مُرًّا.",
    },
    {
      name: "العسل",
      note: "طبيعي، لكنه مرتفع السعرات الحرارية.",
    },
    {
      name: "ليفيا",
      note: "طعم قريب من السكر، وصفر سعرة حرارية.",
    },
  ];

  const tableItems = isAr
    ? SUGAR_ALTERNATIVES.map((item, index) => ({ ...item, ...arabicTableContent[index] }))
    : SUGAR_ALTERNATIVES;
  const tableCellStyle = isAr ? { textAlign: "right" } : undefined;

  const TABS = [
    { id: "comparison", labelKey: "wb_tab_metrics" },
    { id: "table", labelKey: "wb_tab_comparison" },
  ];

  return (
    <section className="why-better section section--dark">
      <div className="container">
        <SectionTitle title={t("wb_title")} subtitle={t("wb_subtitle")} />

        {/* Tab switcher */}
        <ScrollReveal delay={0.2}>
          <div className="why-better__tabs">
            {TABS.map((tab) => (
              <button
                key={tab.id}
                className={`why-better__tab ${activeTab === tab.id ? "why-better__tab--active" : ""}`}
                onClick={() => setActiveTab(tab.id)}
              >
                {t(tab.labelKey)}
              </button>
            ))}
          </div>
        </ScrollReveal>

        {/* Health Metrics Panel */}
        {activeTab === "comparison" && (
          <div className="why-better__panel">
            <div className="why-better__comparisons">
              {COMPARISONS.map((item, i) => (
                <ScrollReveal key={i} delay={i * 0.08}>
                  <div className="why-better__row">
                    <span className="why-better__row-label">
                      {t(item.labelKey)}
                    </span>
                    <div className="why-better__bars">
                      <div className="why-better__bar-group">
                        <span className="why-better__bar-name">{isAr ? "ليفيا" : "Leavia"}</span>
                        <AnimatedBar
                          value={item.leavia}
                          max={item.max}
                          color="linear-gradient(90deg, #1D783B, #c9a84c)"
                          delay={0.2 + i * 0.05}
                        />
                        <span className="why-better__bar-val why-better__bar-val--good">
                          {item.labelKey === "wb_calories"
                            ? (isAr ? "صفر سعرة حرارية" : "Zero calories")
                            : `${item.leavia}${item.unit === "%" ? "%" : ` ${item.unit}`}`}
                        </span>
                      </div>
                      <div className="why-better__bar-group">
                        <span className="why-better__bar-name">{isAr ? "السكر" : "Sugar"}</span>
                        <AnimatedBar
                          value={item.sugar}
                          max={item.max}
                          color="rgba(180, 60, 60, 0.7)"
                          delay={0.3 + i * 0.05}
                        />
                        <span className="why-better__bar-val why-better__bar-val--bad">
                          {item.sugar}
                          {item.unit !== "%" ? ` ${isAr && item.unit === "kcal" ? "سعرة حرارية" : item.unit}` : "%"}
                        </span>
                      </div>
                    </div>
                  </div>
                </ScrollReveal>
              ))}
            </div>
          </div>
        )}

        {/* Diff Table — always visible below tabs */}
        <ScrollReveal>
          <div className="why-better__diff-wrap">
            <h3 className="why-better__diff-title">{t("wb_diff_title")}</h3>
            <div className="why-better__diff-scroll">
              <table className="why-better__diff-table">
                <thead>
                  <tr>
                    <th>{t("wb_diff_th_criteria")}</th>
                    <th className="why-better__diff-th--leavia">
                      {t("wb_diff_th_leavia")}
                    </th>
                    <th>{t("wb_diff_th_sugar")}</th>
                    <th>{t("wb_diff_th_artificial")}</th>
                  </tr>
                </thead>
                <tbody>
                  {[1, 2, 3, 4, 5, 6].map((n) => (
                    <tr key={n}>
                      <td className="why-better__diff-criteria">
                        {t(`wb_diff_r${n}_criteria`)}
                      </td>
                      <td className="why-better__diff-leavia">
                        <ComparisonValue value={t(`wb_diff_r${n}_leavia`)} isAr={isAr} />
                      </td>
                      <td><ComparisonValue value={t(`wb_diff_r${n}_sugar`)} isAr={isAr} /></td>
                      <td><ComparisonValue value={t(`wb_diff_r${n}_art`)} isAr={isAr} /></td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </ScrollReveal>

        {/* Comparison Table Panel */}
        {activeTab === "table" && (
          <ScrollReveal>
            <div className="why-better__table-wrap why-better__table-wrap--flat">
              <table className="why-better__table" dir={isAr ? "rtl" : "ltr"}>
                <thead>
                  <tr>
                    <th style={tableCellStyle}>{isAr ? "المُحلّي" : t("wb_th_sweetener")}</th>
                    <th style={tableCellStyle}>{isAr ? "السعرات الحرارية/100 جرام" : t("wb_th_calories")}</th>
                    <th style={tableCellStyle}>{isAr ? "طبيعي 100%" : t("wb_th_natural")}</th>
                    <th style={tableCellStyle}>{isAr ? "ملاحظات" : t("wb_th_notes")}</th>
                  </tr>
                </thead>
                <tbody>
                  {tableItems.map((item, i) => (
                    <tr
                      key={i}
                      className={
                        item.highlight ? "why-better__table-highlight" : ""
                      }
                    >
                      <td style={tableCellStyle}>
                        <strong>{item.name}</strong>
                      </td>
                      <td style={tableCellStyle}>
                        <span
                          className={
                            item.calories === 0
                              ? "good"
                              : item.calories < 100
                                ? "medium"
                                : "bad"
                          }
                        >
                          {item.highlight && item.calories === 0
                            ? (isAr ? "صفر سعرة حرارية" : "Zero calories")
                            : item.calories}
                        </span>
                      </td>
                      <td style={tableCellStyle}><TableStatus positive={item.natural} isAr={isAr} /></td>
                      <td className="why-better__table-note" style={tableCellStyle}>
                        {isAr ? item.note : t(item.noteKey)}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </ScrollReveal>
        )}
      </div>
    </section>
  );
}
