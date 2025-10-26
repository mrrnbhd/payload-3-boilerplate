import { Passkeys as Passkeys_5afe2312a68aef77a0242fe42f239ed0 } from 'payload-auth/better-auth/plugin/rsc'
import { FolderTableCell as FolderTableCell_ab83ff7e88da8d3530831f296ec4756a } from '@payloadcms/ui/rsc'
import { FolderField as FolderField_ab83ff7e88da8d3530831f296ec4756a } from '@payloadcms/ui/rsc'
import { ExportListMenuItem as ExportListMenuItem_cdf7e044479f899a31f804427d568b36 } from '@payloadcms/plugin-import-export/rsc'
import { AdminInviteButton as AdminInviteButton_5a568d0e24198ca3140489e0d330f424 } from 'payload-auth/better-auth/plugin/client'
import { AdminButtons as AdminButtons_5a568d0e24198ca3140489e0d330f424 } from 'payload-auth/better-auth/plugin/client'
import { GenerateUuidButton as GenerateUuidButton_ce3a59fe00f4e2209a6e5804babc005e } from 'payload-auth/shared/payload/fields'
import { FieldCopyButton as FieldCopyButton_ce3a59fe00f4e2209a6e5804babc005e } from 'payload-auth/shared/payload/fields'
import { Page as Page_cdf7e044479f899a31f804427d568b36 } from '@payloadcms/plugin-import-export/rsc'
import { SortBy as SortBy_cdf7e044479f899a31f804427d568b36 } from '@payloadcms/plugin-import-export/rsc'
import { SortOrder as SortOrder_cdf7e044479f899a31f804427d568b36 } from '@payloadcms/plugin-import-export/rsc'
import { SelectionToUseField as SelectionToUseField_cdf7e044479f899a31f804427d568b36 } from '@payloadcms/plugin-import-export/rsc'
import { FieldsToExport as FieldsToExport_cdf7e044479f899a31f804427d568b36 } from '@payloadcms/plugin-import-export/rsc'
import { CollectionField as CollectionField_cdf7e044479f899a31f804427d568b36 } from '@payloadcms/plugin-import-export/rsc'
import { Preview as Preview_cdf7e044479f899a31f804427d568b36 } from '@payloadcms/plugin-import-export/rsc'
import { ExportSaveButton as ExportSaveButton_cdf7e044479f899a31f804427d568b36 } from '@payloadcms/plugin-import-export/rsc'
import { QueryPresetsAccessCell as QueryPresetsAccessCell_3817bf644402e67bfe6577f60ef982de } from '@payloadcms/ui'
import { QueryPresetsWhereCell as QueryPresetsWhereCell_3817bf644402e67bfe6577f60ef982de } from '@payloadcms/ui'
import { QueryPresetsWhereField as QueryPresetsWhereField_3817bf644402e67bfe6577f60ef982de } from '@payloadcms/ui'
import { QueryPresetsColumnsCell as QueryPresetsColumnsCell_3817bf644402e67bfe6577f60ef982de } from '@payloadcms/ui'
import { QueryPresetsColumnField as QueryPresetsColumnField_3817bf644402e67bfe6577f60ef982de } from '@payloadcms/ui'
import { LogoutButton as LogoutButton_5a568d0e24198ca3140489e0d330f424 } from 'payload-auth/better-auth/plugin/client'
import { default as default_c7fd93faedefc05c64e43d322e449652 } from '@/components/payload/admin-icon.tsx'
import { default as default_75687c102e8403f4ba15e138cbdc20f7 } from '@/components/payload/admin-logo.tsx'
import { RSCRedirect as RSCRedirect_5afe2312a68aef77a0242fe42f239ed0 } from 'payload-auth/better-auth/plugin/rsc'
import { ImportExportProvider as ImportExportProvider_cdf7e044479f899a31f804427d568b36 } from '@payloadcms/plugin-import-export/rsc'
import { S3ClientUploadHandler as S3ClientUploadHandler_f97aa6c64367fa259c5bc0567239ef24 } from '@payloadcms/storage-s3/client'
import { AdminLogin as AdminLogin_5afe2312a68aef77a0242fe42f239ed0 } from 'payload-auth/better-auth/plugin/rsc'
import { AdminSignup as AdminSignup_5afe2312a68aef77a0242fe42f239ed0 } from 'payload-auth/better-auth/plugin/rsc'
import { ForgotPassword as ForgotPassword_5afe2312a68aef77a0242fe42f239ed0 } from 'payload-auth/better-auth/plugin/rsc'
import { ResetPassword as ResetPassword_5afe2312a68aef77a0242fe42f239ed0 } from 'payload-auth/better-auth/plugin/rsc'

export const importMap = {
  'payload-auth/better-auth/plugin/rsc#Passkeys': Passkeys_5afe2312a68aef77a0242fe42f239ed0,
  '@payloadcms/ui/rsc#FolderTableCell': FolderTableCell_ab83ff7e88da8d3530831f296ec4756a,
  '@payloadcms/ui/rsc#FolderField': FolderField_ab83ff7e88da8d3530831f296ec4756a,
  '@payloadcms/plugin-import-export/rsc#ExportListMenuItem':
    ExportListMenuItem_cdf7e044479f899a31f804427d568b36,
  'payload-auth/better-auth/plugin/client#AdminInviteButton':
    AdminInviteButton_5a568d0e24198ca3140489e0d330f424,
  'payload-auth/better-auth/plugin/client#AdminButtons':
    AdminButtons_5a568d0e24198ca3140489e0d330f424,
  'payload-auth/shared/payload/fields#GenerateUuidButton':
    GenerateUuidButton_ce3a59fe00f4e2209a6e5804babc005e,
  'payload-auth/shared/payload/fields#FieldCopyButton':
    FieldCopyButton_ce3a59fe00f4e2209a6e5804babc005e,
  '@payloadcms/plugin-import-export/rsc#Page': Page_cdf7e044479f899a31f804427d568b36,
  '@payloadcms/plugin-import-export/rsc#SortBy': SortBy_cdf7e044479f899a31f804427d568b36,
  '@payloadcms/plugin-import-export/rsc#SortOrder': SortOrder_cdf7e044479f899a31f804427d568b36,
  '@payloadcms/plugin-import-export/rsc#SelectionToUseField':
    SelectionToUseField_cdf7e044479f899a31f804427d568b36,
  '@payloadcms/plugin-import-export/rsc#FieldsToExport':
    FieldsToExport_cdf7e044479f899a31f804427d568b36,
  '@payloadcms/plugin-import-export/rsc#CollectionField':
    CollectionField_cdf7e044479f899a31f804427d568b36,
  '@payloadcms/plugin-import-export/rsc#Preview': Preview_cdf7e044479f899a31f804427d568b36,
  '@payloadcms/plugin-import-export/rsc#ExportSaveButton':
    ExportSaveButton_cdf7e044479f899a31f804427d568b36,
  '@payloadcms/ui#QueryPresetsAccessCell': QueryPresetsAccessCell_3817bf644402e67bfe6577f60ef982de,
  '@payloadcms/ui#QueryPresetsWhereCell': QueryPresetsWhereCell_3817bf644402e67bfe6577f60ef982de,
  '@payloadcms/ui#QueryPresetsWhereField': QueryPresetsWhereField_3817bf644402e67bfe6577f60ef982de,
  '@payloadcms/ui#QueryPresetsColumnsCell':
    QueryPresetsColumnsCell_3817bf644402e67bfe6577f60ef982de,
  '@payloadcms/ui#QueryPresetsColumnField':
    QueryPresetsColumnField_3817bf644402e67bfe6577f60ef982de,
  'payload-auth/better-auth/plugin/client#LogoutButton':
    LogoutButton_5a568d0e24198ca3140489e0d330f424,
  '@/components/payload/admin-icon.tsx#default': default_c7fd93faedefc05c64e43d322e449652,
  '@/components/payload/admin-logo.tsx#default': default_75687c102e8403f4ba15e138cbdc20f7,
  'payload-auth/better-auth/plugin/rsc#RSCRedirect': RSCRedirect_5afe2312a68aef77a0242fe42f239ed0,
  '@payloadcms/plugin-import-export/rsc#ImportExportProvider':
    ImportExportProvider_cdf7e044479f899a31f804427d568b36,
  '@payloadcms/storage-s3/client#S3ClientUploadHandler':
    S3ClientUploadHandler_f97aa6c64367fa259c5bc0567239ef24,
  'payload-auth/better-auth/plugin/rsc#AdminLogin': AdminLogin_5afe2312a68aef77a0242fe42f239ed0,
  'payload-auth/better-auth/plugin/rsc#AdminSignup': AdminSignup_5afe2312a68aef77a0242fe42f239ed0,
  'payload-auth/better-auth/plugin/rsc#ForgotPassword':
    ForgotPassword_5afe2312a68aef77a0242fe42f239ed0,
  'payload-auth/better-auth/plugin/rsc#ResetPassword':
    ResetPassword_5afe2312a68aef77a0242fe42f239ed0,
}
