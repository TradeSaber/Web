import { useState } from 'react'
import { HexColorPicker, HexColorInput } from 'react-colorful'

interface ColorPickerProps {
    children?: any,
    color?: string,
    onChange?: ((newColor: string) => void)
}

function ColorPicker({ children, color: suColor, onChange }: ColorPickerProps) {
    const [color, setColor] = useState(suColor)

    function colorChanged(newColor: string) {
        setColor(newColor)
        if (onChange)
            onChange(newColor)
    }

    return (
        <div>
            <HexColorPicker color={color} onChange={colorChanged} />
            <HexColorInput color={color} onChange={colorChanged} />
            {children}
        </div>
    )
}

export default ColorPicker