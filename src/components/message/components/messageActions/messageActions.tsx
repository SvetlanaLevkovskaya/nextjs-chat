import { FC } from 'react'

import { DeleteOutlined, EditOutlined } from '@ant-design/icons'

interface MessageActionsProps {
  onEdit: () => void
  onDelete: () => void
}

export const MessageActions: FC<MessageActionsProps> = ({ onEdit, onDelete }) => (
  <div className="flex mt-1 space-x-2">
    <EditOutlined style={{ color: '#8E8E93' }} onClick={onEdit} />
    <DeleteOutlined style={{ color: '#8E8E93' }} onClick={onDelete} />
  </div>
)
