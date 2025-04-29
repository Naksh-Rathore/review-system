let requests = 0

export function logRequestInfo(req, res, next) {
    requests++

    const currentDate = new Date()

    const hours = currentDate.getHours();
    const minutes = currentDate.getMinutes().toString().padStart(2, '0')
    const seconds = currentDate.getSeconds().toString().padStart(2, '0')

    const formattedDate = currentDate.toISOString().split('T')[0]

    console.log(`URL: ${req.originalUrl}`)
    console.log(`Method: ${req.method}`)
    console.log(`Date: ${formattedDate}`)
    console.log(`Time: ${hours}:${minutes}:${seconds}`)
    console.log(`Request Number: ${requests}\n`)

    next()
}