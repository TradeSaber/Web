import Series from '../models/Series'

interface SeriesOptionsProps {
    series: Series[]
}

export default function SeriesOptions({ series }: SeriesOptionsProps) {
    
    let seriesOptions: JSX.Element[] = []
    seriesOptions.push(<option key={'-- SELECT --'} value={'-- SELECT --'}>{'-- SELECT --'}</option>)

    for (let i = 0; i < series.length; i++) {
        const activeSeries = series[i]
        seriesOptions.push(<option key={activeSeries.id} value={activeSeries.id}>{activeSeries.name}</option>)
    }

    return (<>{seriesOptions}</>)
}