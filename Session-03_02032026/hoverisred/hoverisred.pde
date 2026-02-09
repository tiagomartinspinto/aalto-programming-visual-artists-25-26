// Number of columns and rows in the grid
int cols = 8; 
int rows = 8; 
int spacing;  // Space between shapes (calculated based on canvas size)

void setup() {
    size(400, 400); // Set canvas size to 400x400 pixels
    spacing = width / cols; // Calculate spacing so squares fit evenly
}

void draw() {
    background(240); // Light gray background
    
    // Loop through rows and columns to create the grid
    for (int y = 0; y < rows; y++) { 
        for (int x = 0; x < cols; x++) {
            int posX = x * spacing; // X position of the square
            int posY = y * spacing; // Y position of the square
            
            // Check if the mouse is inside the current square
            if (mouseX > posX && mouseX < posX + spacing &&
                mouseY > posY && mouseY < posY + spacing) {
                fill(255, 0, 0); // Set color to red when hovered
            } else {
                fill(100); // Set color to gray when not hovered
            }
            
            rect(posX, posY, spacing, spacing); // Draw the square
        }
    }
}
