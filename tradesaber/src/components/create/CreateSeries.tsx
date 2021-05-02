import Media from '../../models/Media'
import React, { useState } from 'react'
import ThemePicker from '../ThemePicker'
import ColorTheme from '../../models/ColorTheme'
import useAllSeries from '../../data/useAllSeries'
import uploadMedia from '../../lib/create/uploadMedia'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faCheck, faTimes } from '@fortawesome/free-solid-svg-icons'
import { Button, Form, Modal, Progress } from 'react-bulma-components'
import createSeries from '../../lib/create/createSeries'

export default function CreateSeries() {

    const colorTheme: ColorTheme = { 
        main: '#000000',
        highlight: null
    }
    
    const { series, mutate } = useAllSeries()
    const [name, setName] = useState('')
    const [open, setOpen] = useState(false)
    const [theme, setTheme] = useState(colorTheme)
    const [validName, setValidName] = useState(true)
    const [description, setDescription] = useState('')
    const [validNameText, setValidNameText] = useState('')
    const [validDescription, setValidDescription] = useState(true)
    const [iconName, setIconName] = useState<string | undefined>(undefined)
    const [uploadingIcon, setUploadingIcon] = useState<FileList | undefined>()
    const [bannerName, setBannerName] = useState<string | undefined>(undefined)
    const [uploadingBanner, setUploadingBanner] = useState<FileList | undefined>()

    const [progress, setProgress] = useState(0)
    const [uploading, setUploading] = useState(false)
    const [progressText, setProgressText] = useState('')
    const [showUploading, setShowUploading] = useState(false)

    function NameHelp() {
        if (!validName)
            return <Form.Help color='danger'>{validNameText}</Form.Help>
        return <></>
    }

    function DescriptionHelp() {
        if (!validDescription)
            return <Form.Help color='danger'>Description cannot be empty.</Form.Help>
        return <></>
    }

    function reset() {
        setName('')
        setProgress(0)
        setIconName('')
        setBannerName('')
        setValidName(true)
        setDescription('')
        setProgressText('')
        setUploading(false)
        setTheme(colorTheme)
        setValidNameText('')
        setValidDescription(true)
        setUploadingIcon(undefined)
        setUploadingBanner(undefined)
    }

    function isValid() {
        return validName && name !== '' && validDescription && description !== '' && theme && uploadingIcon && uploadingBanner
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
        setProgressText('Uploading Icon')

        const icon = uploadingIcon?.item(0)
        if (icon === undefined || icon === null) {
            setUploading(false)
            setProgressText('Invalid Icon File')
            return
        }

        const iconResponse = await uploadMedia(icon, updateProgress)
        if (iconResponse.status !== 200) {
            setUploading(false)
            setProgressText(iconResponse.statusText)
            return
        }
        const uploadedIcon = iconResponse.data as Media

        setProgressText('Uploading Banner')

        const banner = uploadingBanner?.item(0)
        if (banner === undefined || banner === null) {
            setUploading(false)
            setProgressText('Invalid Banner File')
            return
        }

        const bannerResponse = await uploadMedia(banner, updateProgress)
        if (bannerResponse.status !== 200) {
            setUploading(false)
            setProgressText(bannerResponse.statusText)
            return
        }
        const uploadedBanner = bannerResponse.data as Media

        if (uploadedIcon === undefined || uploadedBanner === undefined) {
            setUploading(false)
            setProgressText('An unknown error has occured.')
            return
        }

        const seriesResponse = await createSeries(name, description, uploadedIcon, uploadedBanner, theme)
        reset()
        setProgressText(seriesResponse.status === 200 ? 'Successfully created new series!' : ('An error has occured: ' + seriesResponse?.data?.error ?? seriesResponse.statusText))
        setUploading(false)
        setProgress(100)
        mutate()
    }

    return (
        <>
            <Modal show={open} onClose={() => setOpen(false)}>
                <Modal.Card>
                    <Modal.Card.Header showClose>
                        <Modal.Card.Title>Create Series</Modal.Card.Title>
                    </Modal.Card.Header>
                    <Modal.Card.Body>
                        <form>
                            <Form.Field>
                                <Form.Label>Name</Form.Label>
                                <Form.Control>
                                    <Form.Input value={name} onChange={(e) => {
                                        const seriesName = e.target.value
                                        setName(seriesName)
                                        if (seriesName === '') {
                                            setValidName(false)
                                            setValidNameText('Name cannot be empty.')
                                            return
                                        }
                                        if (series.filter(s => s.name.toLowerCase() === seriesName.toLowerCase()).length > 0) {
                                            setValidName(false)
                                            setValidNameText('Series already exists.')
                                            return
                                        }
                                        setValidName(true)
                                    }} color={!validName ? 'danger' : undefined} />
                                </Form.Control>
                                <NameHelp />
                            </Form.Field>
                            <Form.Field>
                                <Form.Label>Description</Form.Label>
                                <Form.Control>
                                    <Form.Textarea value={description} onChange={(e) => {
                                        const seriesDescription = e.target.value
                                        setDescription(seriesDescription)
                                        setValidDescription(seriesDescription !== '')
                                    }} color={!validDescription ? 'danger' : undefined} />
                                </Form.Control>
                                <DescriptionHelp />
                            </Form.Field>
                            <Form.Field>
                                <Form.Label>Color Theme</Form.Label>
                                <ThemePicker onChange={(t) => setTheme(t)} />
                            </Form.Field>
                            <Form.Field>
                                <Form.Label>Icon</Form.Label>
                                <Form.InputFile filename={iconName} icon={<FontAwesomeIcon icon={uploadingIcon ? faCheck : faTimes} /> } onChange={(e) => {
                                    setUploadingIcon(e.target.files ?? undefined)
                                    setIconName(e.target.files?.item(0)?.name)
                                }} />
                            </Form.Field>
                            <Form.Field>
                                <Form.Label>Banner</Form.Label>
                                <Form.InputFile filename={bannerName} icon={<FontAwesomeIcon icon={uploadingBanner ? faCheck : faTimes} /> } onChange={(e) => {
                                    setUploadingBanner(e.target.files ?? undefined)
                                    setBannerName(e.target.files?.item(0)?.name)
                                }} />
                            </Form.Field>
                        </form>
                    </Modal.Card.Body>
                    <Modal.Card.Footer renderAs={Button.Group} align="right">
                        <Button color="danger" onClick={reset}>Reset</Button>
                        <Button color="success" disabled={!isValid()} onClick={upload}>Upload</Button>
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
                            <p>{progressText}</p>
                            <Progress value={progress} max={100} color="primary" />
                        </div>
                    </Modal.Card.Body>
                </Modal.Card>
            </Modal>
            <Button onClick={() => setOpen(true)}>New Series</Button>
        </>
    )
}