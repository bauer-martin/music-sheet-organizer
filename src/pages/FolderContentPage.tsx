import PrintRoundedIcon from '@mui/icons-material/PrintRounded'
import { Divider, IconButton, List, ListItem, Typography } from '@mui/material'
import { Fragment, useMemo } from 'react'
import { useTranslation } from 'react-i18next'

import { useRouting } from '../contexts/routing'
import { dataSet } from '../dataSet'
import { PageLayout } from '../PageLayout'

export function FolderContentPage() {
    const { route, setRoute } = useRouting()
    const { t } = useTranslation()

    const folder = useMemo(() => {
        if (route.path !== 'data/folders/:folder') {
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

    if (route.path !== 'data/folders/:folder' || !folder || !sheets) {
        return null
    }

    return (
        <PageLayout
            slotProps={{
                header: {
                    backTo: { path: 'data/folders' },
                    title: folder.title,
                    trailingAccessory: (
                        <IconButton
                            color="inherit"
                            onClick={() => setRoute({ path: 'print/:folder', folderId: route.folderId })}
                        >
                            <PrintRoundedIcon />
                        </IconButton>
                    ),
                },
            }}
        >
            <List disablePadding>
                {sheets.map((sheet, index) => (
                    <Fragment key={sheet.key}>
                        <ListItem>{sheet.title}</ListItem>
                        {index < sheets.length - 1 && (
                            <Divider component="li" variant="inset" sx={{ marginInlineStart: 2 }} />
                        )}
                    </Fragment>
                ))}
            </List>
            <Typography
                component="div"
                variant="caption"
                sx={{
                    color: theme => theme.palette.text.secondary,
                    textAlign: 'center',
                    width: '100%',
                    marginBlockEnd: 2,
                }}
            >
                {t('itemCount', { count: sheets.length })}
            </Typography>
        </PageLayout>
    )
}
