import { Component, input, model } from '@angular/core';

@Component({
    selector: 'app-labeled-input',
    imports: [],
    templateUrl: './labeled-input.html',
    styleUrl: './labeled-input.scss',
})
export class LabeledInput {

    readonly label = input.required<string>();
    readonly value = model<string>();

    onInput(event: Event): void {
        const target = event.target as HTMLInputElement;
        this.value.set(target.value);
    }

}
