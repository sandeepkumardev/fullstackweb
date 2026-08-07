import * as React from 'react'
import { cn } from '@/lib/utils'

export type Role = 'owner' | 'teacher' | 'student'
export type Presence = 'online' | 'class' | 'away' | 'offline'

const roleRing: Record<Role, string> = {
  owner: 'ring-role-owner',
  teacher: 'ring-role-teacher',
  student: 'ring-role-student',
}

const presenceColor: Record<Presence, string> = {
  online: 'bg-presence-online',
  class: 'bg-presence-class',
  away: 'bg-presence-away',
  offline: 'bg-presence-offline',
}

const presenceLabel: Record<Presence, string> = {
  online: 'Online',
  class: 'In class',
  away: 'Away',
  offline: 'Offline',
}

const sizeMap = {
  sm: { box: 'h-8 w-8', dot: 'h-2 w-2', text: 'text-caption' },
  md: { box: 'h-10 w-10', dot: 'h-2.5 w-2.5', text: 'text-body-sm' },
  lg: { box: 'h-14 w-14', dot: 'h-3.5 w-3.5', text: 'text-body-lg' },
}

export interface StatusRingProps {
  src?: string
  name: string
  role: Role
  presence?: Presence
  size?: keyof typeof sizeMap
  className?: string
}

/**
 * StatusRing — CampusConnect's signature identity element.
 * The ring color always encodes ROLE (gold = owner, navy = teacher, teal = student).
 * The dot always encodes live PRESENCE. The two never swap meaning, anywhere in the app —
 * that consistency is what makes a crowded feed or chat list scannable at a glance.
 */
export function StatusRing({ src, name, role, presence, size = 'md', className }: StatusRingProps) {
  const s = sizeMap[size]
  const initials = name
    .split(' ')
    .map((n) => n[0])
    .slice(0, 2)
    .join('')
    .toUpperCase()

  return (
    <div data-slot="status-ring" className={cn('relative inline-flex shrink-0', className)}>
      <div
        className={cn(
          s.box,
          'rounded-full ring-2 ring-offset-2 ring-offset-background overflow-hidden bg-muted flex items-center justify-center',
          roleRing[role]
        )}
        title={`${name} · ${role[0].toUpperCase()}${role.slice(1)}`}
      >
        {src ? (
          // eslint-disable-next-line @next/next/no-img-element
          <img src={src} alt={name} className="h-full w-full object-cover" />
        ) : (
          <span className={cn(s.text, 'font-display font-semibold text-muted-foreground')}>{initials}</span>
        )}
      </div>
      {presence && (
        <span
          className={cn(
            s.dot,
            'absolute bottom-0 right-0 rounded-full border-2 border-background',
            presenceColor[presence],
            presence === 'online' && 'animate-pulse-ring'
          )}
          aria-label={presenceLabel[presence]}
        />
      )}
    </div>
  )
}
