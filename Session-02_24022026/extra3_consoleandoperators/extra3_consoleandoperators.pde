void setup() {
  int num1 = 10;  // First number
  int num2 = 3;   // Second number

  int sum = num1 + num2;
  int difference = num1 - num2;
  int product = num1 * num2;
  float quotient = ((float) num1 / num2);  // Casting to float to get decimal division result
  int remainder = num1 % num2;

  println("The sum of " + num1 + " and " + num2 + " is: " + sum);
  println("The difference of " + num1 + " and " + num2 + " is: " + difference);
  println("The product of " + num1 + " and " + num2 + " is: " + product);
  println("The quotient of " + num1 + " divided by " + num2 + " is: " + nf(quotient,0,3));
  println("The remainder of " + num1 + " divided by " + num2 + " is: " + remainder);
}

//why the (float)?
//num1 and num2 are both declared as int values in the beginning.
//By default, when you divide two int values, the result is also an int, meaning it would perform integer division, truncating any decimal portion.
//To ensure the division provides a floating-point result, you explicitly cast num1 to float by writing (float) num1.
//Since one of the operands (num1) is now a float, Java promotes the second operand (num2) to float as well.
//This way, the division operation will return a floating-point result.
//The nf() function is used to format the quotient to display only 3 decimal places.
