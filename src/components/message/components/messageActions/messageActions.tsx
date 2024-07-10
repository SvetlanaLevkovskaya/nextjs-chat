import { FC, memo } from 'react'

import { DeleteOutlined, EditOutlined } from '@ant-design/icons'

interface MessageActionsProps {
  onEdit: () => void
  onDelete: () => void
}

const MessageActions: FC<MessageActionsProps> = ({ onEdit, onDelete }) => (
  <div className="flex mt-1 space-x-2">
    <EditOutlined style={{ color: '#8E8E93', fontSize: 14 }} onClick={onEdit} />
    <DeleteOutlined style={{ color: '#8E8E93', fontSize: 14 }} onClick={onDelete} />
  </div>
)

MessageActions.displayName = 'MessageActions'

export default memo(MessageActions)
