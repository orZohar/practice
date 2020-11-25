import { trigger, state, style, transition,
    animate, group, query, stagger, keyframes
} from '@angular/animations';

export const SlideInOutAnimation = [
 trigger('routerTransition', [
        state('void', style({position: 'fixed', width: '100%', height: '100%'}) ),
        state('*', style({position: 'fixed', width: '100%', height: '100%'}) ),
        transition(':enter', [
          style({transform: 'translateY(100%)'}),
          animate('0.5s ease-in-out', style({transform: 'translateY(0%)'}))
        ]),
        transition(':leave', [
          style({transform: 'translateY(0%)'}),
          animate('0.5s ease-in-out', style({transform: 'translateY(-100%)'}))
        ])
      ])
]
