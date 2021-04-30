import { useState } from 'react'
import { Button, Modal } from 'react-bulma-components'
import User from '../../models/User'

interface CreateSeriesProps {
    uploader: User
}

export default function CreateSeries({ uploader }: CreateSeriesProps) {

    const [open, setOpen] = useState(false)

    return (
        <>
            <Modal show={open} onClose={() => setOpen(false)}>
                <Modal.Card>
                    <Modal.Card.Header showClose>
                        <Modal.Card.Title>Create Series</Modal.Card.Title>
                    </Modal.Card.Header>
                    <Modal.Card.Body>

                    </Modal.Card.Body>
                    <Modal.Card.Footer renderAs={Button.Group} align="right">
                        <Button color="success">Upload</Button>
                    </Modal.Card.Footer>
                </Modal.Card>
            </Modal>
            <Button onClick={() => setOpen(true)}>New Series</Button>
        </>
    )
}