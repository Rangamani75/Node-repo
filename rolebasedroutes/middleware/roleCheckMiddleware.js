module.exports = (allowedRoles) => (req, res, next) => {
const role = (req.headers['x-role'] || '').toLowerCase()
if (!role) return res.status(401).json({ message: 'Role header missing' })
if (!allowedRoles.includes(role)) return res.status(403).json({ message: 'Forbidden: insufficient role' })
next()
}