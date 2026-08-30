import { CssBaseline } from '@mui/material'

import { RoutingProvider, useRouting } from './contexts/routing'
import { FolderContentPage } from './pages/FolderContentPage'
import { FolderPage } from './pages/FolderPage'
import { LibraryPage } from './pages/LibraryPage'
import { PrintablePage } from './pages/PrintablePage'

export function App() {
    return (
        <>
            <CssBaseline enableColorScheme />
            <RoutingProvider>
                <Content />
            </RoutingProvider>
        </>
    )
}

function Content() {
    const { route } = useRouting()
    switch (route.path) {
        case 'data/library':
            return <LibraryPage />
        case 'data/folders':
            return <FolderPage />
        case 'data/folders/:folder':
            return <FolderContentPage />
        case 'print/:folder':
            return <PrintablePage />
    }
}
