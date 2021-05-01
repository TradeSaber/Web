import { useState } from 'react'
import { Level } from 'react-bulma-components'
import ColorTheme from '../models/ColorTheme'
import ColorPicker from './ColorPicker'

interface ThemePickerProps {
    onChange?: ((theme: ColorTheme) => void)
}

function ThemePicker({ onChange }: ThemePickerProps) {
    const colorTheme: ColorTheme = { 
        main: '#000',
        highlight: '#000'
    }

    const [tHighlight, setTHighlight] = useState(false)
    const [theme, setTheme] = useState(colorTheme)

    return (
        <>
            <Level>
                <Level.Item>
                    <div>
                        <p>Main</p>
                        <ColorPicker color={theme.main} onChange={(c) => {
                            const newTheme: ColorTheme = {
                                main: c,
                                highlight: theme.highlight
                            }
                            setTheme(newTheme)
                            if (onChange)
                                onChange(newTheme)
                        }} />
                    </div>
                </Level.Item>
                <Level.Item>
                    <div>
                        <p onClick={() => {
                            let highlightValue = tHighlight
                            setTHighlight(!tHighlight)
                            if (onChange)
                                onChange(theme)
                            const newTheme: ColorTheme = {
                                main: theme.main,
                                highlight: highlightValue ? null : theme.main
                            }
                            setTheme(newTheme)
                            if (onChange)
                                onChange(newTheme)
                        }}>Highlight</p>
                        {tHighlight ? <ColorPicker color={theme.highlight ?? undefined} onChange={(c) => {
                            const newTheme: ColorTheme = {
                                main: theme.main,
                                highlight: c
                            }
                            setTheme(newTheme)
                            if (onChange)
                                onChange(newTheme)
                        }} /> : undefined}
                    </div>
                </Level.Item>
            </Level>
        </>
    )
}

export default ThemePicker