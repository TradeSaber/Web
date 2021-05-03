import { useState } from 'react'
import { Button, Form, Modal } from 'react-bulma-components'
import useRarities from '../../data/useRarities'
import createRarity from '../../lib/create/createRarity'
import ColorPicker from '../ColorPicker'

export default function CreateRarity() {

    const { rarities, mutate } = useRarities()
    const [name, setName] = useState('')
    const [open, setOpen] = useState(false)
    const [status, setStatus] = useState('')
    const [color, setColor] = useState('#000000')
    const [validName, setValidName] = useState(true)
    const [uploading, setUploading] = useState(false)
    const [validNameText, setValidNameText] = useState('')
    const [probability, setProbability] = useState<string>('')

    function NameHelp() {
        if (!validName)
            return <Form.Help color='danger'>{validNameText}</Form.Help>
        return <></>
    }

    function reset() {
        setName('')
        setStatus('')
        setValidName(true)
        setProbability('')
        setValidNameText('')
    }

    function isValid() {
        return validName && !Number.isNaN(Number.parseFloat(probability))
    }

    async function upload() {
        if (!isValid() || uploading)
            return

        setUploading(true)
        const rarityResponse = await createRarity(name, color, Number.parseFloat(probability))
        reset()
        setStatus(rarityResponse.status === 200 ? 'Successfully created new rarity.' : ('An error has occured: ' + rarityResponse?.data?.error ?? rarityResponse.statusText))
        setUploading(false)
        mutate()
    }

    return (
        <>
            <Modal show={open} onClose={() => setOpen(false)}>
                <Modal.Card>
                    <Modal.Card.Header showClose>
                        <Modal.Card.Title>Create Rarity</Modal.Card.Title>
                    </Modal.Card.Header>
                    <Modal.Card.Body>
                        <form>
                            <Form.Field>
                                <Form.Label>Name</Form.Label>
                                <Form.Control>
                                    <Form.Input value={name} onChange={(e) => {
                                        const rarityName = e.target.value
                                        setName(rarityName)
                                        if (rarityName === '') {
                                            setValidName(false)
                                            setValidNameText('Name cannot be empty.')
                                            return
                                        }
                                        if (rarities.filter(r => r.name.toLowerCase() === rarityName.toLowerCase()).length > 0) {
                                            setValidName(false)
                                            setValidNameText('Rarity already exists.')
                                            return
                                        }
                                        setValidName(true)
                                    }} color={!validName ? 'danger' : undefined} />
                                </Form.Control>
                                <NameHelp />
                            </Form.Field>
                            <Form.Field>
                                <Form.Label>Color</Form.Label>
                                <ColorPicker color={color} onChange={setColor} />
                            </Form.Field>
                            <Form.Field>
                                <Form.Label>Probability</Form.Label>
                                <Form.Input value={probability} onChange={(e) => setProbability(e.target.value)} />
                            </Form.Field>
                        </form>
                        {status}
                    </Modal.Card.Body>
                    <Modal.Card.Footer renderAs={Button.Group} align="right">
                        <Button color="danger" onClick={reset}>Reset</Button>
                        <Button color="success" disabled={!isValid()} onClick={upload}>Create</Button>
                    </Modal.Card.Footer>
                </Modal.Card>
            </Modal> 
            <Button onClick={() => setOpen(true)}>New Rarity</Button>
        </>
    )
}