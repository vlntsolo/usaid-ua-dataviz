(function (vega, vegaLite, vl, vegaTooltip, d3) {
  'use strict';

  vega = vega && Object.prototype.hasOwnProperty.call(vega, 'default') ? vega['default'] : vega;
  vegaLite = vegaLite && Object.prototype.hasOwnProperty.call(vegaLite, 'default') ? vegaLite['default'] : vegaLite;
  vl = vl && Object.prototype.hasOwnProperty.call(vl, 'default') ? vl['default'] : vl;

  // Appearance customization to improve readability.
  // See https://vega.github.io/vega-lite/docs/
  const dark = '#3e3c38';
  const config = {
    axis: {
      domain: false,
      tickColor: 'lightGray',
    },
    style: {
      "guide-label": {
        fontSize: 20,
        fill: dark,
        font: 'Arial',
      },
      "guide-title": {
        fontSize: 20,
        fill: dark,
        font: 'Arial',
      }
    },
  };

  const csvUrl = 'https://gist.githubusercontent.com/vlntsolo/392bcf6e094dd2f69c24de0409cf04b3/raw/8ede38c190bd166a33d5c13c246d1c3beae3c9f3/usaid-ua.csv';

  const getData = async () => {
    const data = await d3.csv(csvUrl);
    
    // Have a look at the attributes available in the console!
    console.log(data[0]);

    return data;
  };

  const viz = vl
    .markCircle({ size: 200, opacity: 0.5 })
    .title({ text: 'USAID transfers to Ukraine', fontSize: 25,})
    .transform(
      vl.filter('datum.Amount > 1000000'),
      )
    .encode(
      vl.x().fieldT('Date').title('Year'),
      vl.y()
      .fieldQ('Amount')
      .title('Amount (USD)')
      //.axis({'labelExpr': "datum.label[0] + '0 M'"})
      .scale({ zero: false, "type": "log" }),
      vl.size().fieldQ('Amount'),
      vl.color().fieldN('Type'),
      vl.tooltip([vl.fieldQ('Amount'), vl.fieldN('Purpose')]),
    );

  //Trans type https://iatistandard.org/en/iati-standard/203/codelists/transactiontype/

  vl.register(vega, vegaLite, {
    view: { renderer: 'svg' },
    init: view => { view.tooltip(new vegaTooltip.Handler().call); }
  });

  const run = async () => {
    const marks = viz
      .data(await getData())
      .width(window.innerWidth)
      .height(window.innerHeight)
      .autosize({ type: 'fit', contains: 'padding' })
      .config(config);
    
    document.body.appendChild(await marks.render());
  };
  run();

}(vega, vegaLite, vl, vegaTooltip, d3));

//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiaW5kZXguanMiLCJzb3VyY2VzIjpbImNvbmZpZy5qcyIsImdldERhdGEuanMiLCJ2aXouanMiLCJpbmRleC5qcyJdLCJzb3VyY2VzQ29udGVudCI6WyIvLyBBcHBlYXJhbmNlIGN1c3RvbWl6YXRpb24gdG8gaW1wcm92ZSByZWFkYWJpbGl0eS5cbi8vIFNlZSBodHRwczovL3ZlZ2EuZ2l0aHViLmlvL3ZlZ2EtbGl0ZS9kb2NzL1xuY29uc3QgZGFyayA9ICcjM2UzYzM4JztcbmV4cG9ydCBjb25zdCBjb25maWcgPSB7XG4gIGF4aXM6IHtcbiAgICBkb21haW46IGZhbHNlLFxuICAgIHRpY2tDb2xvcjogJ2xpZ2h0R3JheScsXG4gIH0sXG4gIHN0eWxlOiB7XG4gICAgXCJndWlkZS1sYWJlbFwiOiB7XG4gICAgICBmb250U2l6ZTogMjAsXG4gICAgICBmaWxsOiBkYXJrLFxuICAgICAgZm9udDogJ0FyaWFsJyxcbiAgICB9LFxuICAgIFwiZ3VpZGUtdGl0bGVcIjoge1xuICAgICAgZm9udFNpemU6IDIwLFxuICAgICAgZmlsbDogZGFyayxcbiAgICAgIGZvbnQ6ICdBcmlhbCcsXG4gICAgfVxuICB9LFxufTsiLCJpbXBvcnQgeyBjc3YgfSBmcm9tICdkMyc7XG5cbmNvbnN0IGNzdlVybCA9ICdodHRwczovL2dpc3QuZ2l0aHVidXNlcmNvbnRlbnQuY29tL3ZsbnRzb2xvLzM5MmJjZjZlMDk0ZGQyZjY5YzI0ZGUwNDA5Y2YwNGIzL3Jhdy84ZWRlMzhjMTkwYmQxNjZhMzNkNWMxM2MyNDZkMWMzYmVhZTNjOWYzL3VzYWlkLXVhLmNzdic7XG5cbmV4cG9ydCBjb25zdCBnZXREYXRhID0gYXN5bmMgKCkgPT4ge1xuICBjb25zdCBkYXRhID0gYXdhaXQgY3N2KGNzdlVybCk7XG4gIFxuICAvLyBIYXZlIGEgbG9vayBhdCB0aGUgYXR0cmlidXRlcyBhdmFpbGFibGUgaW4gdGhlIGNvbnNvbGUhXG4gIGNvbnNvbGUubG9nKGRhdGFbMF0pO1xuXG4gIHJldHVybiBkYXRhO1xufTsiLCJpbXBvcnQgdmwgZnJvbSAndmVnYS1saXRlLWFwaSc7XG5leHBvcnQgY29uc3Qgdml6ID0gdmxcbiAgLm1hcmtDaXJjbGUoeyBzaXplOiAyMDAsIG9wYWNpdHk6IDAuNSB9KVxuICAudGl0bGUoeyB0ZXh0OiAnVVNBSUQgdHJhbnNmZXJzIHRvIFVrcmFpbmUnLCBmb250U2l6ZTogMjUsfSlcbiAgLnRyYW5zZm9ybShcbiAgICB2bC5maWx0ZXIoJ2RhdHVtLkFtb3VudCA+IDEwMDAwMDAnKSxcbiAgICApXG4gIC5lbmNvZGUoXG4gICAgdmwueCgpLmZpZWxkVCgnRGF0ZScpLnRpdGxlKCdZZWFyJyksXG4gICAgdmwueSgpXG4gICAgLmZpZWxkUSgnQW1vdW50JylcbiAgICAudGl0bGUoJ0Ftb3VudCAoVVNEKScpXG4gICAgLy8uYXhpcyh7J2xhYmVsRXhwcic6IFwiZGF0dW0ubGFiZWxbMF0gKyAnMCBNJ1wifSlcbiAgICAuc2NhbGUoeyB6ZXJvOiBmYWxzZSwgXCJ0eXBlXCI6IFwibG9nXCIgfSksXG4gICAgdmwuc2l6ZSgpLmZpZWxkUSgnQW1vdW50JyksXG4gICAgdmwuY29sb3IoKS5maWVsZE4oJ1R5cGUnKSxcbiAgICB2bC50b29sdGlwKFt2bC5maWVsZFEoJ0Ftb3VudCcpLCB2bC5maWVsZE4oJ1B1cnBvc2UnKV0pLFxuICApO1xuXG4vL1RyYW5zIHR5cGUgaHR0cHM6Ly9pYXRpc3RhbmRhcmQub3JnL2VuL2lhdGktc3RhbmRhcmQvMjAzL2NvZGVsaXN0cy90cmFuc2FjdGlvbnR5cGUvIiwiaW1wb3J0IHZlZ2EgZnJvbSAndmVnYSc7XG5pbXBvcnQgdmVnYUxpdGUgZnJvbSAndmVnYS1saXRlJztcbmltcG9ydCB2bCBmcm9tICd2ZWdhLWxpdGUtYXBpJztcbmltcG9ydCB7IEhhbmRsZXIgfSBmcm9tICd2ZWdhLXRvb2x0aXAnO1xuaW1wb3J0IHsgY29uZmlnIH0gZnJvbSAnLi9jb25maWcnO1xuaW1wb3J0IHsgZ2V0RGF0YSB9IGZyb20gJy4vZ2V0RGF0YSc7XG5pbXBvcnQgeyB2aXogfSBmcm9tICcuL3Zpeic7XG5cbnZsLnJlZ2lzdGVyKHZlZ2EsIHZlZ2FMaXRlLCB7XG4gIHZpZXc6IHsgcmVuZGVyZXI6ICdzdmcnIH0sXG4gIGluaXQ6IHZpZXcgPT4geyB2aWV3LnRvb2x0aXAobmV3IEhhbmRsZXIoKS5jYWxsKTsgfVxufSk7XG5cbmNvbnN0IHJ1biA9IGFzeW5jICgpID0+IHtcbiAgY29uc3QgbWFya3MgPSB2aXpcbiAgICAuZGF0YShhd2FpdCBnZXREYXRhKCkpXG4gICAgLndpZHRoKHdpbmRvdy5pbm5lcldpZHRoKVxuICAgIC5oZWlnaHQod2luZG93LmlubmVySGVpZ2h0KVxuICAgIC5hdXRvc2l6ZSh7IHR5cGU6ICdmaXQnLCBjb250YWluczogJ3BhZGRpbmcnIH0pXG4gICAgLmNvbmZpZyhjb25maWcpO1xuICBcbiAgZG9jdW1lbnQuYm9keS5hcHBlbmRDaGlsZChhd2FpdCBtYXJrcy5yZW5kZXIoKSk7XG59O1xucnVuKCk7Il0sIm5hbWVzIjpbImNzdiIsIkhhbmRsZXIiXSwibWFwcGluZ3MiOiI7Ozs7Ozs7RUFBQTtFQUNBO0VBQ0EsTUFBTSxJQUFJLEdBQUcsU0FBUyxDQUFDO0VBQ2hCLE1BQU0sTUFBTSxHQUFHO0VBQ3RCLEVBQUUsSUFBSSxFQUFFO0VBQ1IsSUFBSSxNQUFNLEVBQUUsS0FBSztFQUNqQixJQUFJLFNBQVMsRUFBRSxXQUFXO0VBQzFCLEdBQUc7RUFDSCxFQUFFLEtBQUssRUFBRTtFQUNULElBQUksYUFBYSxFQUFFO0VBQ25CLE1BQU0sUUFBUSxFQUFFLEVBQUU7RUFDbEIsTUFBTSxJQUFJLEVBQUUsSUFBSTtFQUNoQixNQUFNLElBQUksRUFBRSxPQUFPO0VBQ25CLEtBQUs7RUFDTCxJQUFJLGFBQWEsRUFBRTtFQUNuQixNQUFNLFFBQVEsRUFBRSxFQUFFO0VBQ2xCLE1BQU0sSUFBSSxFQUFFLElBQUk7RUFDaEIsTUFBTSxJQUFJLEVBQUUsT0FBTztFQUNuQixLQUFLO0VBQ0wsR0FBRztFQUNILENBQUM7O0VDbEJELE1BQU0sTUFBTSxHQUFHLHdJQUF3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