
export class OpenFileDialog {
    // TODO: Just like SaveFileDialog open right mime type
    public static openFileContent(
        acceptedMimeTypes: string[] = ['application/bat', 'text/x-shellscript']): Promise<string> {
        return new Promise((resolve) => {
            const element = document.createElement('input');
            try {
                element.style.position = 'absolute';
                element.style.left = '-9999px';
                element.setAttribute('readonly', ''); // to avoid focus
                element.setAttribute('type', 'file');
                if (acceptedMimeTypes && acceptedMimeTypes.length > 0) {
                    element.accept = acceptedMimeTypes.join(', ');
                }
                element.multiple = false;
                element.onchange = () => {
                    const file = element.files[0];
                    const reader = new FileReader();
                    reader.readAsText(file, 'UTF-8');
                    reader.onload = (event) => {
                        const content = event.target.result;
                        resolve(content as string);
                    };
                };
                element.click();
            } finally {
                element.remove();
            }
        });
    }
}
