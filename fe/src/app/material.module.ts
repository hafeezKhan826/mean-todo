import { NgModule } from '@angular/core';

import {
    MatCardModule,
    MatInputModule,
    MatButtonModule,
    MatToolbarModule,
    MatTabsModule,
    MatDialogModule,
    MatGridListModule,
    MatIconModule
} from '@angular/material';

const modules = [
    MatCardModule,
    MatInputModule,
    MatButtonModule,
    MatToolbarModule,
    MatTabsModule,
    MatDialogModule,
    MatGridListModule,
    MatIconModule
];

@NgModule({
    imports: modules,
    exports: modules,
})
export class MaterialModule { }
