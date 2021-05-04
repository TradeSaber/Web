import React, { useState } from 'react'
import { Button, Form, Modal, Progress } from 'react-bulma-components'
import ColorTheme from '../../models/ColorTheme'
import ThemePicker from '../ThemePicker'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faCheck, faTimes } from '@fortawesome/free-solid-svg-icons'
import MultiRaritySelector from '../MultiRaritySelector'
import Rarity from '../../models/Rarity'
import CardSearch from '../CardSearch'
import MultiCardReference from '../MultiCardReference'
import createPack, { CreatePackCardReference } from '../../lib/create/createPack'
import uploadMedia from '../../lib/create/uploadMedia'
import Media from '../../models/Media'

export default function CreatePack() {
    const colorTheme: ColorTheme = { 
        main: '#000000',
        highlight: null
    }
    
    const [name, setName] = useState('')
    const [value, setValue] = useState('')
    const [open, setOpen] = useState(false)
    const [doValue, setDoValue] = useState(false)
    const [doCards, setDoCards] = useState(false)
    const [theme, setTheme] = useState(colorTheme)
    const [cardCount, setCardCount] = useState('5')
    const [description, setDescription] = useState('')
    const [doRarities, setDoRarities] = useState(false)
    const [rarities, setRarities] = useState<Rarity[]>()
    const [coverName, setCoverName] = useState<string>()
    const [uploadingCover, setUploadingCover] = useState<FileList>()
    const [cards, setCards] = useState<CreatePackCardReference[]>([])
    
    const [status, setStatus] = useState('')
    const [progress, setProgress] = useState(0)
    const [uploading, setUploading] = useState(false)
    const [showUploading, setShowUploading] = useState(false)

    function reset() {
        setName('')
        setValue('')
        setCards([])
        setRarities([])
        setDoCards(false)
        setDoValue(false)
        setCardCount('5')
        setDescription('')
        setTheme(colorTheme)
        setDoRarities(false)
        setCoverName(undefined)
        setUploadingCover(undefined)
    }

    function isValid() {
        if (doValue) {
            if (Number.isNaN(Number.parseFloat(value)))
                return false
        }
        return name !== '' && description !== '' && !Number.isNaN(Number.parseInt(cardCount)) && theme && uploadingCover
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
        setStatus('Uploading Cover Image')

        const cover = uploadingCover?.item(0)
        if (cover === undefined || cover === null) {
            setUploading(false)
            setStatus('Invalid Cover Image File')
            return
        }

        const coverResponse = await uploadMedia(cover, updateProgress)
        if (coverResponse.status !== 200) {
            setUploading(false)
            setStatus(coverResponse?.data?.error ?? coverResponse.statusText)
            return
        }
        const uploadedCover = coverResponse.data as Media

        setStatus('Creating Pack...')

        const val = parseFloat(value)
        const cou = parseInt(cardCount)

        const packResponse = await createPack(name, description, uploadedCover, theme, Number.isNaN(val) ? undefined : val, Number.isNaN(cou) ? undefined : cou, rarities, cards)
        reset()
        setStatus(packResponse.status === 200 ? 'Successfully created new pack.' : ('An error has occured: ' + packResponse?.data?.error ?? packResponse.statusText))
        setUploading(false)
        setProgress(100)
    }

    return (
        <>
            <Modal show={open} onClose={() => setOpen(false)}>
                <Modal.Card>
                    <Modal.Card.Header showClose>
                        <Modal.Card.Title>Create Pack</Modal.Card.Title>
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
                                <Form.Label>Card Count</Form.Label>
                                <Form.Control>
                                    <Form.Input value={cardCount} onChange={(e) => setCardCount(e.target.value)} />
                                </Form.Control>
                            </Form.Field>
                            <Form.Field>
                                <Form.Label>Color Theme</Form.Label>
                                <ThemePicker onChange={(t) => setTheme(t)} />
                            </Form.Field>
                            <Form.Field>
                                <Form.Label>Cover</Form.Label>
                                <Form.InputFile filename={coverName} icon={<FontAwesomeIcon icon={uploadingCover ? faCheck : faTimes} /> } onChange={(e) => {
                                    setUploadingCover(e.target.files ?? undefined)
                                    setCoverName(e.target.files?.item(0)?.name)
                                }} />
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
                                        setRarities(doRarities ? undefined : [])
                                        setDoRarities(!doRarities)
                                    }}>Rarities</Form.Label>
                                    {doRarities ? <MultiRaritySelector value={rarities} onChange={(rs) => setRarities(rs)} /> : <></>}
                            </Form.Field>
                            <Form.Field>
                                <Form.Label onClick={() => {
                                        setDoCards(!doCards)
                                    }}>Card Settings</Form.Label>
                            </Form.Field>
                            <Form.Field kind="addons">
                                {doCards ? <CardSearch onAdd={(e) => {
                                    if (cards.find(c => e.id === c.card.id))
                                        return
                                    const newRef: CreatePackCardReference = {
                                        card: e,
                                        boost: 1,
                                        guaranteed: false
                                    }
                                    let newCards = cards.filter(p => true)
                                    newCards.push(newRef)
                                    setCards(newCards)
                                }} /> : <></>}
                            </Form.Field>
                            {doCards ? <MultiCardReference value={cards} onChange={(c) => {
                                setCards(c)
                            }} /> : <></>}
                        </form>
                        {status}
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
            <Button onClick={() => setOpen(true)}>New Pack</Button>
        </>
    )
}