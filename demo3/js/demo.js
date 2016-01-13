var pieData = [
				{
					value: 300,
					
					label: "Red"
				},
				{
					value: 50,
					
					label: "Green"
				},
				{
					value: 100,
					
					label: "Yellow"
				},
				{
					value: 40,
					
					label: "Grey"
				},
				{
					value: 120,
					
					label: "Dark Grey"
				}

			];

			window.onload = function(){
				var ctx = document.getElementById("canvas").getContext("2d");
				var myPie = new Chart(ctx).Pie(pieData);
			};
