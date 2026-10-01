u.onkeydown = e => {
  if (e.key !== 'Enter') return;
  let v = u.value.trim();
  if (!v) return;
  if (!/^[a-z]+:\/\//i.test(v)) v = 'https://' + v;
  location.href = v;
};
