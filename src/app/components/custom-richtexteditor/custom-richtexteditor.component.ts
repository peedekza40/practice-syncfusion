import { Component, ViewChild } from '@angular/core';
import { PasteCleanupArgs, ActionBeginEventArgs } from '@syncfusion/ej2-angular-richtexteditor';
import { ImageSettingsModel, PasteCleanupSettingsModel } from '@syncfusion/ej2-angular-richtexteditor';
import { ToolbarService, LinkService, ImageService, HtmlEditorService, MarkdownEditorService, RichTextEditorComponent } from '@syncfusion/ej2-angular-richtexteditor';

interface IconFile {
  iconClass: string,
  extension: string
}

@Component({
  selector: 'app-custom-richtexteditor',
  templateUrl: './custom-richtexteditor.component.html',
  styleUrl: './custom-richtexteditor.component.css',
  providers: [
    ToolbarService, 
    LinkService, 
    ImageService, 
    HtmlEditorService,
    MarkdownEditorService 
  ]
})
export class CustomRichtexteditorComponent {

  @ViewChild('customRte') 
  public rteObj?: RichTextEditorComponent;

  public placeholder: string = "Input a content.";

  public mode: string = "HTML";

  public insertImageSettings: ImageSettingsModel = { 
    allowedTypes: ['.jpeg', '.jpg', '.png'], 
    display: 'inline', 
    width: 'auto', 
    height: 'auto' 
  }

  private iconFiles: IconFile[] = [
    {
      iconClass: "e-export-pdf",
      extension: ".pdf"
    },
    {
      iconClass: "e-export-excel",
      extension: ".xlsx"
    },
    {
      iconClass: "e-export-xls",
      extension: ".xls"
    },
    {
      iconClass: "e-export-word-1",
      extension: ".docx"
    },
    {
      iconClass: "e-export-csv",
      extension: ".csv"
    }
  ]

  public pasteCleanupSettings: PasteCleanupSettingsModel = {
    prompt: false
  }

  public onBeforePasteCleanup(event: PasteCleanupArgs) {
    console.log("-------- onBeforePasteCleanup --------");
  }

  public onAfterPasteCleanup(event: PasteCleanupArgs) {
    console.log("-------- onAfterPasteCleanup --------");
  }

  public actionBegin(event: any): void {
    console.log("-------- actionBegin --------");
    let isPaste = false;
    let isDrop = false;
    let data: DataTransfer | null = null;
    if(event.requestType?.toLowerCase() == "paste"){
      isPaste = true;
      data = event.originalEvent.clipboardData;
    }
    else if(event.type?.toLowerCase() == "drop"){
      isDrop = true;
      data = event.dataTransfer;
    }

    const items = data?.items;
    if (items) {
      const itemArray = Array.from(items);
      for (const item of itemArray) {
        if (item.kind === 'file') {
          const file = item.getAsFile();

          // Check if the file is an image
          if (file != null && !file?.type.startsWith('image/')) {
            if(isPaste){
              event.cancel = true;
            }

            // Display the file icon
            this.displayFileIcon(file);
          }
        }
      }
    }
  }

  private displayFileIcon(file: File): void {
    const extension = this.getExtension(file.name);
    const iconClass = this.iconFiles.find(x => x.extension == extension)?.iconClass ?? 'e-file-document';

    const iconHtml = `
    <div class="file-icon">
      <span class="e-icons e-large ${iconClass}"></span>
      <span class="file-name"> ${file.name}</span>
    </div>`;

    // Append the icon HTML to the editor content
    const editorElement = document.querySelector('.e-rte-content .e-content');
    if (editorElement) {
      editorElement.innerHTML += iconHtml;
    }
  }

  private getExtension = (str: string) => str.slice(str.lastIndexOf("."));
}
