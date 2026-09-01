import './PrintablePage.css'

import CloseRoundedIcon from '@mui/icons-material/CloseRounded'
import PrintRoundedIcon from '@mui/icons-material/PrintRounded'
import { Box, Button, Divider, List, ListItem, Stack, Typography } from '@mui/material'
import { useMemo } from 'react'
import { useTranslation } from 'react-i18next'

import { useRouting } from '../contexts/routing'
import { dataSet } from '../dataSet'

export function PrintablePage() {
    const { route, setRoute } = useRouting()
    const { t } = useTranslation()

    const folder = useMemo(() => {
        if (route.path !== 'print/:folder') {
            return undefined
        }
        return dataSet.get(route.folderId)
    }, [route])

    const sheets = useMemo(() => {
        if (!folder) {
            return undefined
        }
        return folder.sheets
    }, [folder])

    if (route.path !== 'print/:folder' || !folder || !sheets) {
        return null
    }

    return (
        <Box sx={{ padding: 2 }}>
            <Typography variant="h4" sx={{ marginBlockEnd: 2 }}>
                {t('printablePage.title')}
            </Typography>
            <List disablePadding>
                {sheets.map(sheet => (
                    <ListItem key={sheet.key} disableGutters disablePadding>
                        {sheet.title}
                    </ListItem>
                ))}
            </List>
            <Divider sx={{ marginBlock: 2 }} className="no-print" />
            <Stack
                direction="row"
                sx={{ justifyContent: 'center', gap: 4, color: theme => theme.palette.action.active }}
                className="no-print"
            >
                <Button
                    startIcon={<CloseRoundedIcon />}
                    color="inherit"
                    onClick={() => setRoute({ path: 'data/folders/:folder', folderId: route.folderId })}
                >
                    {t('printablePage.actions.close')}
                </Button>
                <Button startIcon={<PrintRoundedIcon />} color="inherit" onClick={() => window.print()}>
                    {t('printablePage.actions.print')}
                </Button>
            </Stack>
        </Box>
    )
}
