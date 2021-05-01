import React, { useState } from 'react'
import { Button, Form, Modal } from 'react-bulma-components'
import useAllSeries from '../../data/useAllSeries'
import ColorTheme from '../../models/ColorTheme'
import User from '../../models/User'
import ThemePicker from '../ThemePicker'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faCheck, faTimes } from '@fortawesome/free-solid-svg-icons'

interface CreateSeriesProps {
    uploader: User
}

export default function CreateSeries({ uploader }: CreateSeriesProps) {

    const colorTheme: ColorTheme = { 
        main: '#000000',
        highlight: '#000000'
    }
    
    const { series } = useAllSeries()
    const [name, setName] = useState('')
    const [open, setOpen] = useState(false)
    const [theme, setTheme] = useState(colorTheme)
    const [validName, setValidName] = useState(true)
    const [description, setDescription] = useState('')
    const [validNameText, setValidNameText] = useState('')
    const [validDescription, setValidDescription] = useState(true)
    const [uploadedIcon, setUploadedIcon] = useState<FileList | undefined>()
    const [uploadedBanner, setUploadedBanner] = useState<FileList | undefined>()
    const [iconName, setIconName] = useState<string | undefined>(undefined)
    const [bannerName, setBannerName] = useState<string | undefined>(undefined)

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
        setOpen(true)
        setTheme(colorTheme)
        setValidName(true)
        setDescription('')
        setValidNameText('')
        setValidDescription(true)
        setUploadedIcon(undefined)
        setUploadedBanner(undefined)
        setIconName('')
        setBannerName('')
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
                                <Form.InputFile value={uploadedIcon} filename={iconName} icon={<FontAwesomeIcon icon={uploadedIcon ? faCheck : faTimes} /> } onChange={(e) => {
                                    setUploadedIcon(e.target.files ?? undefined)
                                    setIconName(e.target.files?.item(0)?.name)
                                }} />
                            </Form.Field>
                            <Form.Field>
                                <Form.Label>Banner</Form.Label>
                                <Form.InputFile value={uploadedBanner} filename={bannerName} icon={<FontAwesomeIcon icon={uploadedBanner ? faCheck : faTimes} /> } onChange={(e) => {
                                    setUploadedBanner(e.target.files ?? undefined)
                                    setBannerName(e.target.files?.item(0)?.name)
                                }} />
                            </Form.Field>
                        </form>
                    </Modal.Card.Body>
                    <Modal.Card.Footer renderAs={Button.Group} align="right">
                        <Button color="danger" onClick={reset}>Reset</Button>
                        <Button color="success" disabled={!(validName && name !== '' && validDescription && description !== '' && theme && uploadedIcon && uploadedBanner)}>Upload</Button>
                    </Modal.Card.Footer>
                </Modal.Card>
            </Modal>
            <Button onClick={() => setOpen(true)}>New Series</Button>
        </>
    )
}