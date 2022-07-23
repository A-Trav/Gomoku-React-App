import style from './DropDown.module.css'

export default function DropDown() {

    return (
        <select className={style.dropDown}
            defaultValue="default">
            <option value="default" disabled hidden>Select board size</option>
            {
                Array.from(Array(5).keys()).map((x) =>
                    <option key={x} value={x + 1}>{x + 1}</option>)
            }
        </select >
    )
}
