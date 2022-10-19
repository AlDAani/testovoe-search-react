import { QueryStatus } from "@reduxjs/toolkit/dist/query";
import {useCallback, useMemo } from "react";
import { SearchResponce } from "../Search/types";
import styles from './style.module.pcss'

type DropdownProps = {
    list: SearchResponce,
    status: QueryStatus
}

const Dropdown = ({list, status}: DropdownProps) => {
    const isLoading = status === 'pending';
    const plug = useMemo(() => (
        status !== 'rejected' && status !== 'fulfilled' ? <div className={styles.noData}>
            { isLoading ? 'загрузка' : 'Ничего не найдено'}
        </div> : null
    ), [list, status])

    const generateContent = useCallback(() => (
        list.map((el) => {
            return (
                <div className={styles.item} key={el.logo}>
                    <div><img src={el.logo} width={54} height={54} /></div>
                    <div className={styles.about}>
                        <div>{el.name}</div>
                        <div className={styles.domain}>{el.domain}</div>
                    </div>
                </div>
            )
        }
    )), [list]);

    return (
        <div className={styles.dropdown}>
            {(isLoading || !list.length) ? plug : generateContent()}
        </div>
    )
}

export default Dropdown;
