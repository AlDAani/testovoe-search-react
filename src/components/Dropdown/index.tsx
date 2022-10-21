import { QueryStatus } from "@reduxjs/toolkit/dist/query";
import { useMemo } from "react";
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
    ), [isLoading, status])

    return (
        <div className={styles.dropdown}>
            {(isLoading || !list.length) ? plug : (
                list.map((el) => {
                        return (
                            <div className={styles.item} key={el.logo}>
                                <img alt="Logo" src={el.logo} width={54} height={54} />
                                <div className={styles.about}>
                                    <div>{el.name}</div>
                                    <div className={styles.domain}>{el.domain}</div>
                                </div>
                            </div>
                        )
                    }
            )
                )}
        </div>
    )
}

export default Dropdown;
