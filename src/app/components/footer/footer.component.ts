import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { Keyboard } from '@ionic-native/keyboard/ngx';

@Component({
  selector: 'app-footer',
  templateUrl: './footer.component.html',
  styleUrls: ['./footer.component.scss'],
  providers: [Keyboard]
})
export class FooterComponent implements OnInit {

  keyboardUp = false;

  constructor(
    private keyboard: Keyboard,
    private cd: ChangeDetectorRef
  ) { }

  ngOnInit() {
    this.keyboard.onKeyboardWillShow().subscribe(()=>{
      this.keyboardUp = true;
      this.cd.detectChanges();
    });

    this.keyboard.onKeyboardWillHide().subscribe(()=>{
      this.keyboardUp = false;
      this.cd.detectChanges();
    }); 
  }
}