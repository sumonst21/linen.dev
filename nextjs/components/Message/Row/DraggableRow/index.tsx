import React, { createRef } from 'react';
import classNames from 'classnames';
import styles from './index.module.scss';
import { Mode } from 'hooks/mode';

interface Props {
  className?: string;
  draggable: boolean;
  children: React.ReactNode;
  id: string;
  mode?: Mode;
}

export default function DraggableRow({
  id,
  className,
  draggable,
  children,
  mode,
}: Props) {
  const ref = createRef<HTMLDivElement>();
  if (!draggable) {
    return (
      <div className={className} ref={ref}>
        {children}
      </div>
    );
  }
  function handleDragStart(event: React.DragEvent) {
    event.dataTransfer.setData(
      'text',
      JSON.stringify({
        type: 'message',
        id,
      })
    );
  }

  function handleDragOver(event: React.DragEvent) {
    event?.preventDefault();
    return false;
  }

  function handleDragEnter(event: React.DragEvent) {
    event.preventDefault();
    event.stopPropagation();
  }

  return (
    <div
      className={classNames(className, styles.draggable, {
        [styles.dragging]: mode === Mode.Drag,
      })}
      onDragStart={handleDragStart}
      onDragOver={handleDragOver}
      onDragEnter={handleDragEnter}
      draggable
      ref={ref}
    >
      {children}
    </div>
  );
}
