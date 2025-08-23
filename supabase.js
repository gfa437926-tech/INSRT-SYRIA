// supabase.js - إدارة الاتصال بقاعدة البيانات Supabase

import { createClient } from 'https://cdn.jsdelivr.net/npm/@supabase/supabase-js@2'

// تهيئة Supabase
const SUPABASE_URL = 'https://your-project.supabase.co' // استبدل برابط مشروعك
const SUPABASE_ANON_KEY = 'your-anon-key' // استبدل بمفتاح المشروع

// إنشاء عميل Supabase
const supabase = createClient(SUPABASE_URL, SUPABASE_ANON_KEY)

// دالة لتسجيل الدخول
async function loginUser(email, password) {
  try {
    const { data, error } = await supabase.auth.signInWithPassword({
      email: email,
      password: password,
    })
    
    if (error) throw error
    return data
  } catch (error) {
    console.error('Error logging in:', error.message)
    throw error
  }
}

// دالة لتسجيل الخروج
async function logoutUser() {
  try {
    const { error } = await supabase.auth.signOut()
    if (error) throw error
  } catch (error) {
    console.error('Error logging out:', error.message)
    throw error
  }
}

// دالة للحصول على المستخدم الحالي
function getCurrentUser() {
  return supabase.auth.getUser()
}

// دالة لإدراج بيانات ساعية
async function insertHourlyData(data) {
  try {
    const { data: result, error } = await supabase
      .from('hourly_data')
      .insert([data])
      .select()
    
    if (error) throw error
    return result
  } catch (error) {
    console.error('Error inserting hourly data:', error.message)
    throw error
  }
}

// دالة لإدراج بيانات يومية
async function insertDailyData(data) {
  try {
    const { data: result, error } = await supabase
      .from('daily_data')
      .insert([data])
      .select()
    
    if (error) throw error
    return result
  } catch (error) {
    console.error('Error inserting daily data:', error.message)
    throw error
  }
}

// دالة لجلب المحطات
async function fetchStations() {
  try {
    const { data, error } = await supabase
      .from('stations')
      .select('*')
      .order('name')
    
    if (error) throw error
    return data
  } catch (error) {
    console.error('Error fetching stations:', error.message)
    throw error
  }
}

// دالة لجلب المستخدمين (للمديرين فقط)
async function fetchUsers() {
  try {
    const { data, error } = await supabase
      .from('users')
      .select('*')
      .order('created_at', { ascending: false })
    
    if (error) throw error
    return data
  } catch (error) {
    console.error('Error fetching users:', error.message)
    throw error
  }
}

// دالة لإضافة محطة جديدة
async function addStation(stationData) {
  try {
    const { data, error } = await supabase
      .from('stations')
      .insert([stationData])
      .select()
    
    if (error) throw error
    return data
  } catch (error) {
    console.error('Error adding station:', error.message)
    throw error
  }
}

// دالة لإضافة مستخدم جديد
async function addUser(userData) {
  try {
    const { data, error } = await supabase
      .from('users')
      .insert([userData])
      .select()
    
    if (error) throw error
    return data
  } catch (error) {
    console.error('Error adding user:', error.message)
    throw error
  }
}

// دالة لحذف محطة
async function deleteStation(stationId) {
  try {
    const { error } = await supabase
      .from('stations')
      .delete()
      .eq('id', stationId)
    
    if (error) throw error
  } catch (error) {
    console.error('Error deleting station:', error.message)
    throw error
  }
}

// دالة لحذف مستخدم
async function deleteUser(userId) {
  try {
    const { error } = await supabase
      .from('users')
      .delete()
      .eq('id', userId)
    
    if (error) throw error
  } catch (error) {
    console.error('Error deleting user:', error.message)
    throw error
  }
}

// تصدير الدوال للاستخدام في ملفات أخرى
export {
  supabase,
  loginUser,
  logoutUser,
  getCurrentUser,
  insertHourlyData,
  insertDailyData,
  fetchStations,
  fetchUsers,
  addStation,
  addUser,
  deleteStation,
  deleteUser
}