# Characters Practice Sheet Generator

A customizable web application for creating Chinese character practice sheets. Perfect for students, teachers, and anyone learning or practicing Chinese handwriting.

## 🔗 Links

- **Live Demo**: [Characters Practice Sheet Generator](https://chinese-characters-6ln.pages.dev/)
- **Author**: [Pablo Perez](https://github.com/yaoming16)

## 📸 Screenshots

_Add screenshots here to showcase the interface and generated practice sheets_

## ✨ Features

### Character Input & Display
- Enter any Chinese characters you want to practice
- Automatic character information lookup (definition, pinyin, stroke order)
- Support for multiple characters in a single practice sheet

### Customization Options

#### Layout Controls
- **Boxes Per Row**: Set how many character boxes appear in each row (1-∞)
- **Rows Per Character**: Define how many rows each character gets (1-∞)
- **Practice Squares**: Add empty practice squares per line (0-rows per character)
- **Practice Lines**: Control how many lines show practice squares (1-rows per character)

#### Font & Grid Options
- **3 Chinese Fonts**: Choose from FangSong (欢迎), KaiTi (欢迎), or SimSun (欢迎)
- **3 Grid Types**: 
  - Basic grid (standard boxes)
  - Cross grid (with center guides)
  - Square grid (米字格)
- **Letter Opacity**: Adjust character transparency (0-100%) for tracing practice

#### Display Options
- **Show Definition**: Display English meaning for each character
- **Show Pinyin**: Add romanization pronunciation
- **Show Stroke Order**: Visual guide for proper character writing sequence

#### Title Customization
- Custom title text for your practice sheet
- Adjustable font size (0-500px)
- Text styling: **Bold**, _Italic_, <u>Underline</u>

#### Advanced Layout
- **Margins**: Fine-tune left, right, top, and bottom spacing
- **Row Spacing**: Control vertical spacing between character rows
- **Column Spacing**: Adjust horizontal spacing between boxes
- **Separation Lines**: Add visual dividers between different characters

### Export & Preview
- Real-time preview in browser
- PDF generation for printing
- Optimized for standard paper sizes

## 🚀 Getting Started

### Prerequisites
- Node.js (v16 or higher recommended)
- npm or yarn

## 📖 Usage

1. **Enter Characters**: Type the Chinese characters you want to practice in the "Characters" input field
2. **Configure Layout**: Set your preferred boxes per row and rows per character
3. **Choose Display Options**: Toggle definition, pinyin, or stroke order as needed
4. **Select Font & Grid**: Pick your preferred Chinese font and grid style
5. **Adjust Advanced Settings** (optional): Fine-tune margins, spacing, and opacity
6. **Preview**: Click the toggle to see your practice sheet in real-time
7. **Download**: Export as PDF for printing

### Tips
- Start with 8 boxes per row and 2 rows per character for standard practice sheets
- Use higher opacity (80-100%) for reference, lower (10-30%) for tracing practice
- Enable stroke order for beginners learning proper character formation
- Use practice squares for repeated writing without reference characters

## 🛠️ Tech Stack

- **React 19** 
- **TypeScript** - Type safety
- **Vite** - Build tool and dev server
- **Tailwind CSS v4** - Styling
- **Flowbite React** - UI components
- **@react-pdf/renderer** - PDF generation

## 👤 Author

**Pablo Perez**
- GitHub: [@yaoming16](https://github.com/yaoming16)
