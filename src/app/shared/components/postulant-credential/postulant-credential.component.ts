import {
  Component,
  ViewChild,
  ElementRef,
  Input,
  OnChanges,
  Output,
  EventEmitter,
  OnInit,
} from '@angular/core';

import { QRCodeComponent } from 'angularx-qrcode';

import { Postulant } from '../../models/postulant.model';

@Component({
  selector: 'wc-postulant-credential',
  templateUrl: './postulant-credential.component.html',
  styleUrls: ['./postulant-credential.component.scss'],
})
export class PostulantCredentialComponent implements OnInit, OnChanges {
  qrData = 'QR was not generated yet';
  @Output() credentialLoaded = new EventEmitter();
  @Input() canvasWidth: number;
  @Input() canvasHeight: number;
  @Input() postulant: Postulant;
  @ViewChild('credentialCanvas', { static: true })
  credentialCanvas: ElementRef;
  @ViewChild('qrCode', { static: true })
  private qrCode: QRCodeComponent;

  ngOnInit(): void {
    this.credentialLoaded.emit();
  }

  ngOnChanges(): void {
    this.loadCredential();
  }

  print(): void {
    const printButton = document.createElement('a');
    printButton.download = this.postulant.fullName;
    printButton.href =
      this.credentialCanvas.nativeElement.toDataURL('image/png;base64');
    printButton.click();
  }

  private loadCredential(): void {
    if (this.postulant) {
      this.qrData = this.postulant.id;
      const context = (
        this.credentialCanvas.nativeElement as HTMLCanvasElement
      ).getContext('2d');
      const templateImage = new Image();
      const qrTop = 210;
      const qrLeft = 35;
      const nameTop = 190;
      const nameLeft = this.canvasWidth / 2;

      templateImage.src = 'assets/images/cred-vertical.png';
      templateImage.onload = () => {
        let qrImage = this.qrCode.qrcElement.nativeElement.querySelector('img');

        if (!qrImage || !qrImage?.src) {
          qrImage =
            this.qrCode.qrcElement.nativeElement.querySelector('canvas');
        }

        if (qrImage) {
          context.drawImage(templateImage, 0, 0);
          context.font = '20px Montserrat';
          context.textAlign = 'center';
          context.fillText(this.postulant.fullName, nameLeft, nameTop);
          context.drawImage(qrImage, qrLeft, qrTop);
        }
      };
    }
  }
}
