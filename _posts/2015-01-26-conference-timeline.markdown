---
layout: post
title:  "Conference Timeline"
date:   2015-01-26 18:14:55
categories: jekyll update
---
<p>This post describes a conceptual idea of a conference watcher that enables users to manage their target conferences.</p>
 <p>I would appreciate anyone who could help me to change this image into an interative webpage with the following features:
	<ul>
	  <li>Add/Remove a conference</li>
	  <li>When a conference is selected, those overlapped will be unavailable (grayed out); this is for detecting double submissions</li>
	  <li>Manage by publication: each publication has its own timeline</li>
	</ul>
 </p>
 
 {% raw %}
     <script type="text/javascript" src="https://www.google.com/jsapi"></script>
    <script type="text/javascript">
      google.load("visualization", "1", {packages:["timeline"]});
      google.setOnLoadCallback(drawChart);

      function drawChart() {
        var container = document.getElementById('timeline');
        var chart = new google.visualization.Timeline(container);
        var dataTable = new google.visualization.DataTable();

        dataTable.addColumn({ type: 'string', id: 'Abbr' });
        dataTable.addColumn({ type: 'string', id: 'Name' });
        dataTable.addColumn({ type: 'date', id: 'Abstract' });
        dataTable.addColumn({ type: 'date', id: 'Notification' });
        dataTable.addRows([
          [ 'PaPoC', 'PaPoC', new Date(2015, 1, 17), new Date(2015, 2, 6) ],
          [ 'Mobicom', 'Mobicom',  new Date(2015, 2, 4),  new Date(2015, 5, 5) ],
          [ 'Systor', 'Systor',      new Date(2015, 2, 5),  new Date(2015, 3, 5) ],
          [ 'HotCloud', 'HotCloud',  new Date(2015, 2, 10),  new Date(2015, 3, 28) ],
          [ 'HotStorage', 'HotStorage',  new Date(2015, 2, 17),  new Date(2015, 3, 21) ],
          [ 'SOSP', 'SOSP',  new Date(2015, 2, 19),  new Date(2015, 5, 29) ],
          [ 'SRDS', 'SRDS',  new Date(2015, 2, 30),  new Date(2015, 5, 22) ],
          [ 'SOCC', 'SOCC',  new Date(2015, 3, 24),  new Date(2015, 5, 19) ],
          [ 'DISC', 'DISC',  new Date(2015, 4, 10),  new Date(2015, 6, 23) ]]);

        chart.draw(dataTable);
      }
    </script>
 {% endraw %}
 
![timeline](/img/cfptimeline.jpg)
