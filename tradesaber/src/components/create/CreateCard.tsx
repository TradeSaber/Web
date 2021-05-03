import { useState } from 'react'
import { Button, Form, Modal, Progress } from 'react-bulma-components'
import useAllSeries from '../../data/useAllSeries'
import useRarities from '../../data/useRarities'
import RarityOptions from '../RarityOptions'
import SeriesOptions from '../SeriesOptions'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faCheck, faTimes } from '@fortawesome/free-solid-svg-icons'
import uploadMedia from '../../lib/create/uploadMedia'
import Media from '../../models/Media'
import createCard from '../../lib/create/createCard'

export default function CreateCard() {

    const { series: allSeries } = useAllSeries()
    const { rarities } = useRarities()
    const [name, setName] = useState('')
    const [open, setOpen] = useState(false)
    const [status, setStatus] = useState('')
    const [isPublic, setIsPublic] = useState(true)
    const [rarity, setRarity] = useState('-- SELECT --')
    const [series, setSeries] = useState('-- SELECT --')
    const [description, setDescription] = useState('')
    const [maximum, setMaximum] = useState('')
    const [value, setValue] = useState('')
    const [probability, setProbability] = useState('')
    const [uploading, setUploading] = useState(false)

    const [doValue, setDoValue] = useState(false)
    const [doMaximum, setDoMaximum] = useState(false)
    const [doProbability, setDoProbability] = useState(false)

    const [baseName, setBaseName] = useState<string | undefined>(undefined)
    const [uploadingBase, setUploadingBase] = useState<FileList | undefined>(undefined)

    const [progress, setProgress] = useState(0)
    const [showUploading, setShowUploading] = useState(false)

    function reset() {
        setName('')
        setStatus('')
        setProbability('')
        setIsPublic(true)
        setValue('')
        setMaximum('')
        setDescription('')
        setRarity('-- SELECT --')
        setSeries('-- SELECT --')
        setDoValue(false)
        setDoMaximum(false)
        setDoProbability(false)
        setBaseName(undefined)
        setUploadingBase(undefined)
    }

    function isValid() {
        if (doValue) {
            if (Number.isNaN(Number.parseFloat(value)))
                return false
        }

        if (doMaximum) {
            if (Number.isNaN(Number.parseInt(maximum)))
                return false
        }

        if (doProbability) {
            if (Number.isNaN(Number.parseFloat(probability)))
                return false
        }

        return name !== '' && description !== '' && rarity !== '-- SELECT --' && series !== '-- SELECT --' && uploadingBase
    }

    function updateProgress(value: number) {
        setProgress(value)
    }

    async function upload() {
        if (!isValid())
            return

        setOpen(false)
        updateProgress(0)
        setUploading(true)
        setShowUploading(true)
        setStatus('Uploading Base Image')

        const base = uploadingBase?.item(0)
        if (base === undefined || base === null) {
            setUploading(false)
            setStatus('Invalid Base Image File')
            return
        }

        const baseResponse = await uploadMedia(base, updateProgress)
        if (baseResponse.status !== 200) {
            setUploading(false)
            setStatus(baseResponse?.data?.error ?? baseResponse.statusText)
            return
        }
        const uploadedBase = baseResponse.data as Media

        setStatus('Generating Card...')

        const rarityObject = rarities.find(r => r.name === rarity)
        if (rarityObject === undefined) {
            setUploading(false)
            setStatus('Could not find rarity.')
            return
        }

        const seriesObject = allSeries.find(s => s.id === series)
        if (seriesObject === undefined) {
            setUploading(false)
            setStatus('Could not find series.')
            return
        }

        const cardResponse = await createCard(name, description, rarityObject, seriesObject, uploadedBase, isPublic, doMaximum ? parseInt(maximum) : undefined, doValue ? parseFloat(value) : undefined, doProbability ? parseFloat(probability) : undefined)
        reset()
        setStatus(cardResponse.status === 200 ? 'Successfully created new card.' : ('An error has occured: ' + cardResponse?.data?.error ?? cardResponse.statusText))
        setUploading(false)
        setProgress(100)
    }

    return (
        <>
            <Modal show={open} onClose={() => setOpen(false)}>
                <Modal.Card>
                    <Modal.Card.Header showClose>
                        <Modal.Card.Title>Create Card</Modal.Card.Title>
                    </Modal.Card.Header>
                    <Modal.Card.Body>
                        <form>
                            <Form.Field>
                                <Form.Label>Name</Form.Label>
                                <Form.Control>
                                    <Form.Input value={name} onChange={(e) => setName(e.target.value)} />
                                </Form.Control>
                            </Form.Field>
                            <Form.Field>
                                <Form.Label>Description</Form.Label>
                                <Form.Control>
                                    <Form.Textarea value={description} onChange={(e) => setDescription(e.target.value)} />
                                </Form.Control>
                            </Form.Field>
                            <Form.Field>
                                <Form.Label>Rarity</Form.Label>
                                <Form.Control>
                                    <Form.Select value={rarity} onChange={(e) => setRarity(e.target.value)}>
                                        <RarityOptions rarities={rarities} />
                                    </Form.Select>
                                </Form.Control>
                            </Form.Field>
                            <Form.Field>
                                <Form.Label>Series</Form.Label>
                                <Form.Control>
                                    <Form.Select value={series} onChange={(e) => setSeries(e.target.value)}>
                                        <SeriesOptions series={allSeries} />
                                    </Form.Select>
                                </Form.Control>
                            </Form.Field>
                            <Form.Field>
                                <Form.Label>Private?</Form.Label>
                                <Form.Control>
                                    <Form.Checkbox onChange={(e => setIsPublic(!isPublic))} />
                                </Form.Control>
                            </Form.Field>
                            <Form.Field>
                                <Form.Label onClick={() => {
                                    setMaximum(doMaximum ? '' : '10')
                                    setDoMaximum(!doMaximum)
                                }}>Maximum</Form.Label>
                                <Form.Control>
                                    {doMaximum ? <Form.Input value={maximum} onChange={(e) => setMaximum(e.target.value)} /> : <></>}
                                </Form.Control>
                            </Form.Field>
                            <Form.Field>
                                <Form.Label onClick={() => {
                                    setValue(doValue ? '' : '1')
                                    setDoValue(!doValue)
                                }}>Value</Form.Label>
                                <Form.Control>
                                    {doValue ? <Form.Input value={value} onChange={(e) => setValue(e.target.value)} /> : <></>}
                                </Form.Control>
                            </Form.Field>
                            <Form.Field>
                                <Form.Label onClick={() => {
                                    setProbability(doProbability ? '' : '1')
                                    setDoProbability(!doProbability)
                                }}>Maximum</Form.Label>
                                <Form.Control>
                                    {doProbability ? <Form.Input value={probability} onChange={(e) => setProbability(e.target.value)} /> : <></>}
                                </Form.Control>
                            </Form.Field>
                            <Form.Field>
                                <Form.Label>Base Image</Form.Label>
                                <Form.InputFile filename={baseName} icon={<FontAwesomeIcon icon={uploadingBase ? faCheck : faTimes} /> } onChange={(e) => {
                                    setUploadingBase(e.target.files ?? undefined)
                                    setBaseName(e.target.files?.item(0)?.name)
                                }} />
                            </Form.Field>
                        </form>
                    </Modal.Card.Body>
                    <Modal.Card.Footer renderAs={Button.Group} align="right">
                        <Button color="danger" onClick={reset}>Reset</Button>
                        <Button color="success" disabled={!isValid()} onClick={upload}>Create</Button>
                    </Modal.Card.Footer>
                </Modal.Card>
            </Modal>
            <Modal show={showUploading} onClose={() => {
                if (!uploading)
                    setShowUploading(false)
                    setOpen(false)
            }}>
                <Modal.Card>
                    <Modal.Card.Header showClose>
                        <Modal.Card.Title>Uploading</Modal.Card.Title>
                    </Modal.Card.Header>
                    <Modal.Card.Body>
                        <div>
                            <p>{status}</p>
                            <Progress value={progress} max={100} color="primary" />
                        </div>
                    </Modal.Card.Body>
                </Modal.Card>
            </Modal>
            <Button onClick={() => setOpen(true)}>New Card</Button>
        </>
    )
}