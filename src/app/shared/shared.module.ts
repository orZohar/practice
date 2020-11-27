import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NavBarComponent } from '../shared/components/nav-bar/nav-bar.component';
import { FormsModule } from '@angular/forms';
import { ReactiveFormsModule } from '@angular/forms';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { UnescapePipe } from './pipes/unescape.pipe';
import { DialogModule} from 'primeng/dialog';
import { DynamicDialogModule} from 'primeng/dynamicdialog';
import { FormatTimePipe } from './pipes/format-time.pipe';

@NgModule({
  declarations: [NavBarComponent, UnescapePipe, FormatTimePipe],
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    FontAwesomeModule,
    DialogModule,
    DynamicDialogModule,
  ],
  exports: [
    NavBarComponent,
    FormsModule,
    ReactiveFormsModule,
    FontAwesomeModule,
    UnescapePipe,
    FormatTimePipe,
    DialogModule,
    DynamicDialogModule,
  ],
})
export class SharedModule { }
