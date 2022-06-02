import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FileItemComponent } from './file-item.component';

describe('FileItemComponent', () => {
  let component: FileItemComponent;
  let fixture: ComponentFixture<FileItemComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [FileItemComponent],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(FileItemComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should have the correct input values', () => {
    component.size = 10;
    component.title = 'Title';

    expect(component.size).toEqual(10);
    expect(component.title).toEqual('Title');
  });

  it('should render a container', () => {
    const container = fixture.nativeElement.querySelector(
      '[data-test="file-item-container"]'
    );

    expect(container).toBeTruthy();
  });

  it('should render a size', () => {
    const size = fixture.nativeElement.querySelector(
      '[data-test="file-item-size"]'
    );

    expect(size).toBeTruthy();
  });

  it('should render a title', () => {
    const title = fixture.nativeElement.querySelector(
      '[data-test="file-item-title"]'
    );

    expect(title).toBeTruthy();
  });
});
