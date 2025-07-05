import React from 'react';
import { useSortable } from '@dnd-kit/sortable';
import { CSS } from '@dnd-kit/utilities';

export function SortableItem({ id, index }) {
    const {
        attributes,
        listeners,
        setNodeRef,
        transform,
        transition,
    } = useSortable({ id });

    const style = {
        transform: CSS.Transform.toString(transform),
        transition,
        padding: '12px',
        border: '1px solid #ccc',
        borderRadius: '4px',
        background: '#f9f9f9',
        cursor: 'grab',
    };

    return (
        <li ref={setNodeRef} style={style} {...attributes} {...listeners}>
            {index + 1}. {id}
        </li>
    );
}
