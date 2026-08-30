import LibraryMusicRoundedIcon from '@mui/icons-material/LibraryMusicRounded'
import QueueMusicRoundedIcon from '@mui/icons-material/QueueMusicRounded'
import { Tab, tabClasses, Tabs } from '@mui/material'
import { useMemo } from 'react'
import { useTranslation } from 'react-i18next'

import { useRouting } from '../contexts/routing'

export function TabBar() {
    const { t } = useTranslation('common', { keyPrefix: 'tabBar' })
    const { route, setRoute } = useRouting()

    const selectedTab = useMemo(() => {
        switch (route.path) {
            case 'data/library':
                return 'library'
            case 'data/folders':
            // fallthrough
            case 'data/folders/:folder':
                return 'folders'
            case 'print/:folder':
                return false
        }
    }, [route.path])

    return (
        <Tabs
            variant="fullWidth"
            value={selectedTab}
            slots={{ indicator: NoOpIndicator }}
            sx={theme => ({
                backgroundColor: theme.palette.background.default,
                borderTopWidth: 1,
                borderTopStyle: 'solid',
                borderTopColor: theme.palette.divider,
                paddingBlockEnd: 'calc(env(safe-area-inset-bottom))',
                [`.${tabClasses.root}`]: { minHeight: '50px' },
            })}
        >
            <Tab
                label={t('library')}
                icon={<QueueMusicRoundedIcon />}
                iconPosition="start"
                value="library"
                onClick={() => setRoute({ path: 'data/library' })}
            />
            <Tab
                label={t('folders')}
                icon={<LibraryMusicRoundedIcon />}
                iconPosition="start"
                value="folders"
                onClick={() => setRoute({ path: 'data/folders' })}
            />
        </Tabs>
    )
}

function NoOpIndicator() {
    return null
}
