import { NUTRITION_DATA } from './nutritionData'
import './NutritionTable.css'

function BilingualLabel({ label, className = '' }) {
  return (
    <span className={`nutrition-table__bilingual ${className}`.trim()}>
      <span className="nutrition-table__ar" lang="ar" dir="rtl">{label.ar}</span>
      <span className="nutrition-table__en" lang="en" dir="ltr">{label.en}</span>
    </span>
  )
}

export default function NutritionTable({ isAr }) {
  const data = NUTRITION_DATA

  return (
    <div className="nutrition-table__frame" dir={isAr ? 'rtl' : 'ltr'} data-no-localize>
      <table className="nutrition-table">
        <caption>
          <BilingualLabel label={data.title} className="nutrition-table__title" />
        </caption>
        <thead>
          <tr className="nutrition-table__serving-row">
            <th colSpan="3" scope="colgroup">
              <div className="nutrition-table__serving-grid">
                <BilingualLabel label={data.serving.size} />
                <BilingualLabel label={data.serving.count} />
              </div>
            </th>
          </tr>
          <tr className="nutrition-table__columns">
            <th scope="col"><BilingualLabel label={data.columns.nutrient} /></th>
            <th scope="col"><BilingualLabel label={data.columns.amount} /></th>
            <th scope="col"><BilingualLabel label={data.columns.dailyValue} /></th>
          </tr>
        </thead>
        <tbody>
          {data.rows.map((row) => (
            <tr key={row.en}>
              <th scope="row">
                <BilingualLabel label={row} />
              </th>
              <td className="nutrition-table__amount"><bdi dir="ltr">{row.value}</bdi></td>
              <td className="nutrition-table__daily-value"><bdi dir="ltr">{row.dailyValue}</bdi></td>
            </tr>
          ))}
        </tbody>
        <tfoot>
          <tr>
            <td colSpan="3" className="nutrition-table__footnote">
              <BilingualLabel label={data.footnote} />
            </td>
          </tr>
        </tfoot>
      </table>
    </div>
  )
}
