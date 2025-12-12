import "./HistoricItemStyle.css"

export const HistoricItem = ({ prediction }) => {

    let percentage = (prediction.confidence * 100).toFixed(1) // to fixed colcoa o numero maximo de casa decimais

    let color = "#ff2400"

    if (percentage > 50) {
        color = "#DAA520"
    }

    if (percentage > 80) {
        color = "#87D95E"    
    }

    return (
        <div className="container-item">
            <div className="info-left">
                <span className="protozoa-name-text">
                    {prediction.className}
                </span>
                <span className="confidence-badge" style={{backgroundColor: `${color}`}}>{percentage}%</span>
            </div>
            <img className="historic-image" src={prediction.image.filePath} alt={prediction.className} />
        </div>
    )
}