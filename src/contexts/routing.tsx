import {
    createContext,
    type Dispatch,
    type PropsWithChildren,
    type SetStateAction,
    use,
    useMemo,
    useState,
} from 'react'

export type Route =
    | { path: 'data/folders' }
    | { path: 'data/folders/:folder'; folderId: string }
    | { path: 'data/library' }
    | { path: 'print/:folder'; folderId: string }

export type RoutingContextType = {
    route: Route
    setRoute: Dispatch<SetStateAction<Route>>
}

const RoutingContext = createContext<RoutingContextType | null>(null)

export function RoutingProvider({ children }: PropsWithChildren) {
    const [route, setRoute] = useState<Route>({ path: 'data/library' })

    const contextValue = useMemo(() => ({ route, setRoute }) satisfies RoutingContextType, [route])

    return <RoutingContext value={contextValue}>{children}</RoutingContext>
}

export function useRouting() {
    const context = use(RoutingContext)
    if (!context) {
        throw new Error('useRouting must be used within a RoutingProvider')
    }
    return context
}
