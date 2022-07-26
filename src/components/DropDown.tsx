import style from './DropDown.module.css'

type DropDownProp = {
    setSelectedOption: (value: number) => void
}

export default function DropDown(props: DropDownProp) {
    const { setSelectedOption } = props
    return (
        <select className={style.dropDown}
            defaultValue={'default'}
            onChange={(e) => { setSelectedOption(parseInt(e.target.value)) }}>
            <option value="default" disabled hidden>Select board size</option>
            {
                Array.from(Array(5).keys()).map((x) =>
                    <option key={x} value={x + 1}>{x + 1}</option>)
            }
        </select >
    )
}
