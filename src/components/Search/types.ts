
export type State = {
    value: string;
    data: SearchResponce;
};

export type Action = Partial<State> | ((state: State) => null | Partial<State>);

export type SearchResponce = {
    domain: string
    logo: string
    name: string
}[]

export type SearchRequest = {
    query: string
}
