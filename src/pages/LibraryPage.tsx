import { darken, Divider, List, ListItem, ListItemText, ListSubheader, Typography } from '@mui/material'
import { Fragment, useMemo } from 'react'
import { useTranslation } from 'react-i18next'

import { dataSet } from '../dataSet'
import { PageLayout } from '../PageLayout'

type ViewModel = {
    key: string
    folderTitle: string
    sheetTitle: string
}

export function LibraryPage() {
    const { t } = useTranslation()

    const sheetGroups = useMemo(() => {
        const groups = new Map<string, ViewModel[]>()
        for (const folder of dataSet.values()) {
            for (const sheet of folder.sheets) {
                const firstCharacter = sheet.title[0].toUpperCase()
                if (!groups.has(firstCharacter)) {
                    groups.set(firstCharacter, [])
                }
                groups.get(firstCharacter)!.push({ key: sheet.key, folderTitle: folder.title, sheetTitle: sheet.title })
            }
        }
        return Array.from(groups.entries(), ([sectionHeader, entries]) => ({ sectionHeader, entries })).sort((a, b) =>
            a.sectionHeader.localeCompare(b.sectionHeader)
        )
    }, [])

    const totalCount = useMemo(() => sheetGroups.reduce((acc, group) => acc + group.entries.length, 0), [sheetGroups])

    return (
        <PageLayout>
            <List disablePadding>
                {sheetGroups.map(sheetGroup => (
                    <li key={sheetGroup.sectionHeader}>
                        <ListSubheader
                            component="div"
                            sx={{
                                lineHeight: 1,
                                paddingBlockStart: 1,
                                paddingBlockEnd: 1,
                                backgroundColor: theme => darken(theme.palette.background.default, 0.05),
                            }}
                        >
                            {sheetGroup.sectionHeader}
                        </ListSubheader>
                        <List disablePadding>
                            {sheetGroup.entries.map((sheet, index) => (
                                <Fragment key={sheet.key}>
                                    <ListItem>
                                        <ListItemText primary={sheet.sheetTitle} />
                                        <Typography
                                            variant="body2"
                                            sx={{ color: theme => theme.palette.text.secondary }}
                                        >
                                            {sheet.folderTitle}
                                        </Typography>
                                    </ListItem>
                                    {index < sheetGroup.entries.length - 1 && (
                                        <Divider component="li" variant="inset" sx={{ marginInlineStart: 2 }} />
                                    )}
                                </Fragment>
                            ))}
                        </List>
                    </li>
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
                {t('itemCount', { count: totalCount })}
            </Typography>
        </PageLayout>
    )
}
