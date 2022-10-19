import {ChangeEvent, useEffect, useReducer, useRef} from "react";
import {getInitialState, reducer} from "./reducer";
import { useLazyGetDataQuery} from "./api";
import styles from './style.module.pcss'
import {resetData, searchDataSuccess, setTextValue } from "./actionsCreators";
import {useDebounce} from "../../hooks/useDebounce";
import Dropdown from "../Dropdown";

const Search = () => {
    const [state, dispatch] = useReducer(reducer, null, getInitialState);
    const { value, data } = state;
    const debouncedValue = useDebounce(value);
    const inputRef = useRef<HTMLInputElement>(null);
    const [getQuery, {status}] = useLazyGetDataQuery()
    useEffect(() => {
        if(debouncedValue.length) {
            const promise = getQuery({query: debouncedValue})
            promise
                .then((res) => {
                    res.data && dispatch(searchDataSuccess(res.data));
                })
                .catch((error) => {
                    console.error(error);
                });

            // для отмены запроса при изменении инпута и при условии что запрос еще не выполнился
            return () => {
                promise.abort();
            };
        }
    }, [debouncedValue])

    const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
        data.length && dispatch(resetData())
        dispatch(setTextValue(e.target.value))
    }

    return (
        <div className={styles.wrapper}>
            <div className={styles.searchBlock}>
            <input
                className={styles.search}
                type="text"
                ref={inputRef}
                value={value}
                autoComplete="off"
                spellCheck={false}
                placeholder='Что ищем?'
                onChange={handleChange}
            />
            {debouncedValue.length ? <Dropdown list={data} status={status} /> : null}
            </div>
        </div>
    )
}

export default Search;
