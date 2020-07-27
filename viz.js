import vl from 'vega-lite-api';
export const viz = vl
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