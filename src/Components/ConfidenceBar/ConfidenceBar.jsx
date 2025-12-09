import "./ConfidenceBar.css"

// @params value é o nosso valor de confiança  
export const ConfidenceBar = ({ value }) => {
  const percentage = (value * 100).toFixed(1) // to fixed colcoa o numero maximo de casa decimais

  //cor começa vermelha
  let color = "#ff2400"

    if (percentage > 50) {
        color = "#DAA520"
    }

    if (percentage > 80) {
        color = "#87D95E"    
    }

  return (
    <div className="confidenceBarContainer">
        <div className="textConfidenceBarContainer">
            <span className="titleConfidence">Confiança da IA</span>
            <span className="titlePercentage" style={{backgroundColor: `${color}`}}>{percentage}%</span>
        </div>

        <div className="borderBar">
            <div className="confidenceBar" style={{width: `${percentage}%`, color: `${color}`}}>
                
            </div>
        </div>
    </div>
  )

}