import {
  Component,
  ViewChild,
  ElementRef,
  Input,
  OnChanges
} from '@angular/core';

import { QRCodeComponent } from 'angularx-qrcode';

import { Postulant } from '../../shared/models/postulant.model';

@Component({
  selector: 'wc-postulant-credential',
  templateUrl: './postulant-credential.component.html',
  styleUrls: ['./postulant-credential.component.scss']
})
export class PostulantCredentialComponent implements OnChanges {
  qrData = 'QR was not generated yet';
  @Input() postulant: Postulant;
  @ViewChild('credentialCanvas', { static: true })
  private credentialCanvas: ElementRef;
  @ViewChild('qrCode', { static: true })
  private qrCode: QRCodeComponent;

  constructor() {}

  ngOnChanges(): void {
    this.loadCredential();
  }

  private loadCredential(): void {
    if (this.postulant) {
      this.qrData = JSON.stringify(this.postulant);
      const context = (this.credentialCanvas
        .nativeElement as HTMLCanvasElement).getContext('2d');
      const templateImage = new Image();
      templateImage.src = 'assets/images/cred-vertical.png';
      templateImage.onload = () => {
        context.drawImage(templateImage, 0, 0);
        context.font = '20px Montserrat';
        context.fillText(this.postulant.fullName, 25, 190);
        const qrImage = this.qrCode.el.nativeElement.querySelector('img');
        context.drawImage(qrImage, 70, 240);
      };
    }
  }
}
