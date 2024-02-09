interface CodeProps extends React.ComponentPropsWithoutRef<'code'> {
  children: React.ReactNode;
}

export const Code = ({ children, ...props }: CodeProps) => (
  <code
    style={{
      background: '#f9f7fb',
      border: '1px solid #ede7f3',
      borderRadius: '4px',
      padding: '2px 6px',
      fontSize: '0.9375em',
    }}
    {...props}
  >
    {children}
  </code>
);
